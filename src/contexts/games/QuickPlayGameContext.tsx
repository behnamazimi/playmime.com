import { getRandomWords } from "@/utils/indexedDb";
import React, {
  createContext,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import {
  QuickPlayGameSettings,
  QuickPlayGameState,
  QuickPlayTeam,
} from "@/contexts/games/types";

export type Action =
  | {
      type: "INITIALIZE_GAME";
      payload: { settings: QuickPlayGameSettings; wordPool: string[] };
    }
  | { type: "START_TURN" }
  | {
      type: "SUBMIT_RESULT";
      payload: boolean;
    }
  | { type: "CHANGE_WORD" }
  | { type: "TICK" }
  | { type: "FINALIZE_GAME" }
  | { type: "CANCEL_GAME" };

const defaultState: QuickPlayGameState = {
  gameId: "",
  status: "initialized",
  settings: { numberOfTeams: 0, timePerTeam: 0 },
  currentTurnTeamId: 0,
  teams: [],
  wordPool: [],
  currentWord: null,
};

const gameReducer = (
  state: QuickPlayGameState,
  action: Action
): QuickPlayGameState => {
  switch (action.type) {
    case "INITIALIZE_GAME": {
      const { settings, wordPool } = action.payload;
      return {
        gameId: `game-${Date.now()}`,
        status: "initialized",
        settings,
        currentTurnTeamId: 1,
        teams: Array.from({ length: settings.numberOfTeams }, (_, index) => ({
          teamId: index + 1,
          score: 0,
          timeRemaining: settings.timePerTeam,
        })),
        wordPool,
        currentWord: null,
      };
    }

    case "START_TURN": {
      // Get the last item from wordPool
      const currentWord = state.wordPool[state.wordPool.length - 1];

      const newWordPool = state.wordPool.slice(0, state.wordPool.length - 1);

      return {
        ...state,
        status: "running",
        currentWord,
        // Reinitialize wordPool by removing the last item and placing it at the front
        wordPool: [currentWord, ...newWordPool],
      };
    }

    case "SUBMIT_RESULT": {
      const guessedCorrectly = action.payload;
      const updatedTeams = state.teams.map((team) =>
        team.teamId === state.currentTurnTeamId
          ? {
              ...team,
              score: team.score + (guessedCorrectly ? 1 : 0),
            }
          : team
      );

      // Get the last item from wordPool
      const currentWord = state.wordPool[state.wordPool.length - 1];

      let newWordPool = state.wordPool.slice(0, state.wordPool.length - 1);
      // Remove previous word (index 0) from the wordPool if payload is true
      if (guessedCorrectly) {
        newWordPool = newWordPool.slice(1);
      }
      return {
        ...state,
        currentWord,
        // Reinitialize wordPool by removing the last item and placing it at the front
        wordPool: [currentWord, ...newWordPool],
        teams: updatedTeams,
      };
    }

    case "CHANGE_WORD": {
      // Get the last item from wordPool
      const currentWord = state.wordPool[state.wordPool.length - 1];

      const newWordPool = state.wordPool.slice(0, state.wordPool.length - 1);

      return {
        ...state,
        currentWord,
        // Reinitialize wordPool by removing the last item and placing it at the front
        wordPool: [currentWord, ...newWordPool],
      };
    }

    case "TICK": {
      const teamId = state.currentTurnTeamId;
      const updatedTeams = state.teams.map((team) =>
        team.teamId === teamId
          ? { ...team, timeRemaining: Math.max(0, team.timeRemaining - 1) }
          : team
      );

      const updatedState = { ...state, teams: updatedTeams };

      const activeTeam = updatedTeams.find((team) => team.teamId === teamId);
      // when time is up for the active team
      if (activeTeam?.timeRemaining === 0) {
        // find next team that not played in current round
        const nextTeam = updatedState.teams.find(
          (team) => team.timeRemaining > 0
        );

        // when there is no team left to play in current round
        if (!nextTeam) {
          // when all teams have played all rounds
          updatedState.status = "finalized";
          // sort teams by score
          updatedState.teams.sort((a, b) => b.score - a.score);
        } else {
          // when there are still teams left to play in current round
          updatedState.currentTurnTeamId = nextTeam.teamId;
          updatedState.status = "waiting";
        }
      }

      return updatedState;
    }

    case "FINALIZE_GAME": {
      return {
        ...state,
        status: "finalized",
        // sort teams by score
        teams: state.teams.sort((a, b) => b.score - a.score),
      };
    }

    case "CANCEL_GAME": {
      return defaultState;
    }

    default:
      return state;
  }
};

const QuickPlayGameContext = createContext<{
  state: QuickPlayGameState;
  initializeGame: (settings: QuickPlayGameSettings) => void;
  startNextTurn: () => void;
  submitResult: (guessedCorrectly: boolean) => void;
  finalizeGame: () => void;
  cancelGame: () => void;
  getCurrentTeam: () => QuickPlayTeam | null;
  changeWord: () => void;
}>({
  state: defaultState,
  initializeGame: () => {},
  startNextTurn: () => {},
  submitResult: () => {},
  finalizeGame: () => {},
  cancelGame: () => {},
  getCurrentTeam: () => null,
  changeWord: () => {},
});

// Provider
export const QuickPlayGameProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(gameReducer, defaultState);
  const language = useLocale() as Locale;

  const initializeGame = useCallback(
    async ({ numberOfTeams, timePerTeam }: QuickPlayGameSettings) => {
      const randomWords = await getRandomWords(
        language,
        numberOfTeams * timePerTeam * 2 // times 2 to have enough words
      );
      const wordPool = randomWords.map((word) => word.word);

      dispatch({
        type: "INITIALIZE_GAME",
        payload: {
          settings: { numberOfTeams, timePerTeam },
          wordPool,
        },
      });
    },
    [language]
  );

  const startNextTurn = useCallback(() => {
    dispatch({ type: "START_TURN" });
  }, []);

  const submitResult = useCallback((guessedCorrectly: boolean) => {
    dispatch({ type: "SUBMIT_RESULT", payload: guessedCorrectly });
  }, []);

  const finalizeGame = useCallback(() => {
    dispatch({ type: "FINALIZE_GAME" });
  }, []);

  const cancelGame = useCallback(() => {
    dispatch({ type: "CANCEL_GAME" });
  }, []);

  const changeWord = useCallback(() => {
    dispatch({ type: "CHANGE_WORD" });
  }, []);

  // Timer management
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.status === "running") {
      interval = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.status]);

  const value = useMemo(
    () => ({
      state,
      initializeGame,
      startNextTurn,
      submitResult,
      finalizeGame,
      cancelGame,
      getCurrentTeam: () =>
        state.teams.find((team) => team.teamId === state.currentTurnTeamId) ||
        null,
      changeWord,
    }),
    [
      state,
      initializeGame,
      startNextTurn,
      submitResult,
      finalizeGame,
      cancelGame,
      changeWord,
    ]
  );

  return <QuickPlayGameContext value={value}>{children}</QuickPlayGameContext>;
};

// Custom Hooks
export const useQuickPlayGame = () => {
  const context = use(QuickPlayGameContext);
  if (context === undefined) {
    throw new Error(
      "useQuickPlayGame must be used within a QuickPlayGameProvider"
    );
  }
  return context;
};
