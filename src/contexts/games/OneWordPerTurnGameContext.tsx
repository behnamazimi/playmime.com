import { getRandomWords } from "@/utils/indexedDb";

import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  useMemo,
  use,
  useCallback,
} from "react";
import { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import type {
  OneWordPerTurnGameSettings,
  Team,
  OneWordPerTurnGameState,
} from "@/contexts/games/types";
import {
  calculateFinalScoreForTeams,
  nextTurnIdentification,
} from "@/contexts/games/utils";
import { Word } from "@/types";

export type Action =
  | {
      type: "INITIALIZE_GAME";
      payload: { settings: OneWordPerTurnGameSettings; wordPool: Word[] };
    }
  | { type: "START_NEXT_TURN" }
  | {
      type: "SUBMIT_RESULT";
      payload: boolean;
    }
  | { type: "CHANGE_WORD" }
  | { type: "TICK" }
  | { type: "FINALIZE_GAME" }
  | { type: "CANCEL_GAME" };

const defaultState: OneWordPerTurnGameState = {
  gameId: "",
  status: "initialized",
  settings: { numberOfTeams: 0, numberOfRounds: 0, timePerTeam: 0 },
  currentRound: 0,
  currentTurnTeamId: 0,
  teams: [],
  wordPool: [],
  currentWord: null,
};

const gameReducer = (
  state: OneWordPerTurnGameState,
  action: Action
): OneWordPerTurnGameState => {
  switch (action.type) {
    case "INITIALIZE_GAME": {
      const { settings, wordPool } = action.payload;
      return {
        gameId: `game-${Date.now()}`,
        status: "initialized",
        settings,
        currentRound: 1,
        currentTurnTeamId: 1,
        teams: Array.from({ length: settings.numberOfTeams }, (_, index) => ({
          teamId: index + 1,
          score: 0,
          finalScore: "0",
          timeRemaining: settings.timePerTeam,
          hasPlayedInRound: false,
        })),
        wordPool,
        currentWord: null,
      };
    }

    case "START_NEXT_TURN": {
      return {
        ...state,
        status: "running",
        currentWord: state.wordPool.pop() || null,
      };
    }

    case "SUBMIT_RESULT": {
      const guessedCorrectly = action.payload;
      const updatedTeams = state.teams.map((team) =>
        team.teamId === state.currentTurnTeamId
          ? {
              ...team,
              score: team.score + (guessedCorrectly ? 1 : 0),
              hasPlayedInRound: true,
            }
          : team
      );

      const updatedState = {
        ...state,
        teams: updatedTeams,
      };

      return nextTurnIdentification(updatedState);
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

      let updatedState = { ...state, teams: updatedTeams };

      const activeTeam = updatedTeams.find((team) => team.teamId === teamId);

      // when time is up for the active team
      if (activeTeam?.timeRemaining === 0) {
        updatedState = nextTurnIdentification(updatedState);
      }

      return updatedState;
    }

    case "FINALIZE_GAME": {
      return {
        ...state,
        status: "finalized",
        teams: calculateFinalScoreForTeams(
          state.teams,
          state.settings.timePerTeam,
          state.settings.numberOfRounds
        ),
      };
    }

    case "CANCEL_GAME": {
      return defaultState;
    }

    default:
      return state;
  }
};

const OneWordPerTurnGameContext = createContext<{
  state: OneWordPerTurnGameState;
  initializeGame: (settings: OneWordPerTurnGameSettings) => void;
  startNextTurn: () => void;
  submitResult: (guessedCorrectly: boolean) => void;
  finalizeGame: () => void;
  cancelGame: () => void;
  getCurrentTeam: () => Team | null;
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
export const OneWordPerTurnGameProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(gameReducer, defaultState);
  const language = useLocale() as Locale;

  const initializeGame = useCallback(
    async ({
      numberOfTeams,
      numberOfRounds,
      timePerTeam,
    }: OneWordPerTurnGameSettings) => {
      const wordPool = await getRandomWords(
        language,
        numberOfRounds * numberOfTeams * 2 // times 2 to have enough words
      );

      dispatch({
        type: "INITIALIZE_GAME",
        payload: {
          settings: { numberOfTeams, numberOfRounds, timePerTeam },
          wordPool,
        },
      });
    },
    [language]
  );

  const startNextTurn = useCallback(() => {
    dispatch({ type: "START_NEXT_TURN" });
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

  return (
    <OneWordPerTurnGameContext value={value}>
      {children}
    </OneWordPerTurnGameContext>
  );
};

// Custom Hooks
export const useOneWordPerTurnGame = () => {
  const context = use(OneWordPerTurnGameContext);
  if (context === undefined) {
    throw new Error(
      "useOneWordPerTurnGame must be used within a OneWordPerTurnGameProvider"
    );
  }
  return context;
};
