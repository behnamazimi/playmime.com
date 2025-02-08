import { getRandomWords } from "@/utils/indexedDb";

import React, {
  createContext,
  useReducer,
  ReactNode,
  useMemo,
  use,
  useCallback,
} from "react";
import { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import type {
  HeadsUpGameSettings,
  HeadsUpGameState,
  Player,
} from "@/contexts/games/types";
import { Word } from "@/types";
import useTickEverySecond from "@/contexts/games/hooks/useTickEverySecond";
import { useSoundFx } from "@/contexts/SoundFxContext";

export type Action =
  | {
      type: "INITIALIZE_GAME";
      payload: { settings: HeadsUpGameSettings; wordPool: Word[] };
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

const defaultState: HeadsUpGameState = {
  gameId: "",
  status: "initialized",
  settings: { numberOfPlayers: 0, timePerPlayer: 0 },
  currentTurnPlayerId: 0,
  players: [],
  wordPool: [],
  currentWord: null,
};

const gameReducer = (
  state: HeadsUpGameState,
  action: Action
): HeadsUpGameState => {
  switch (action.type) {
    case "INITIALIZE_GAME": {
      const { settings, wordPool } = action.payload;
      return {
        gameId: `game-${Date.now()}`,
        status: "initialized",
        settings,
        currentTurnPlayerId: 1,
        players: Array.from(
          { length: settings.numberOfPlayers },
          (_, index) => ({
            playerId: index + 1,
            score: 0,
            timeRemaining: settings.timePerPlayer,
            hasPlayedInRound: false,
          })
        ),
        wordPool,
        currentWord: null,
      };
    }

    case "START_NEXT_TURN": {
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
      const updatedPlayers = state.players.map((player) =>
        player.playerId === state.currentTurnPlayerId
          ? {
              ...player,
              score: player.score + (guessedCorrectly ? 1 : 0),
            }
          : player
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
        players: updatedPlayers,
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
      const playerId = state.currentTurnPlayerId;
      const updatedPlayers = state.players.map((player) =>
        player.playerId === playerId
          ? { ...player, timeRemaining: Math.max(0, player.timeRemaining - 1) }
          : player
      );

      const updatedState = { ...state, players: updatedPlayers };

      const currentPlayer = updatedPlayers.find(
        (player) => player.playerId === playerId
      );

      // when time is up for the active player
      if (currentPlayer?.timeRemaining === 0) {
        // find next player that not played in current round
        const nextPlayer = updatedPlayers.find(
          (player) => player.timeRemaining > 0 && !player.hasPlayedInRound
        );

        if (nextPlayer) {
          // when there are still players left to play
          updatedState.currentTurnPlayerId = nextPlayer.playerId;
          updatedState.status = "waiting";
        } else {
          updatedState.status = "finalized";
        }
      }

      return updatedState;
    }

    case "FINALIZE_GAME": {
      return {
        ...state,
        status: "finalized",
      };
    }

    case "CANCEL_GAME": {
      return defaultState;
    }

    default:
      return state;
  }
};

const HeadsUpGameContext = createContext<{
  state: HeadsUpGameState;
  initializeGame: (settings: HeadsUpGameSettings) => void;
  startNextTurn: () => void;
  submitResult: (guessedCorrectly: boolean) => void;
  finalizeGame: () => void;
  cancelGame: () => void;
  getCurrentPlayer: () => Player | null;
  changeWord: () => void;
}>({
  state: defaultState,
  initializeGame: () => {},
  startNextTurn: () => {},
  submitResult: () => {},
  finalizeGame: () => {},
  cancelGame: () => {},
  getCurrentPlayer: () => null,
  changeWord: () => {},
});

// Provider
export const HeadsUpGameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, defaultState);
  const language = useLocale() as Locale;
  const { playClockTicking, stopClockTicking, playSuccess } = useSoundFx();

  const initializeGame = useCallback(
    async ({ numberOfPlayers, timePerPlayer }: HeadsUpGameSettings) => {
      const wordPool = await getRandomWords(
        language,
        numberOfPlayers * timePerPlayer * 5 // times 5 to have enough words
      );

      const wordsWithTwoWordsMax = wordPool.filter(
        (word) => word.word.split(" ").length <= 2
      );

      dispatch({
        type: "INITIALIZE_GAME",
        payload: {
          settings: { numberOfPlayers, timePerPlayer },
          wordPool: wordsWithTwoWordsMax,
        },
      });
    },
    [language]
  );

  const startNextTurn = useCallback(() => {
    dispatch({ type: "START_NEXT_TURN" });
  }, []);

  const submitResult = useCallback(
    (guessedCorrectly: boolean) => {
      dispatch({ type: "SUBMIT_RESULT", payload: guessedCorrectly });

      if (guessedCorrectly) {
        playSuccess();
      }
    },
    [playSuccess]
  );

  const finalizeGame = useCallback(() => {
    dispatch({ type: "FINALIZE_GAME" });
  }, []);

  const cancelGame = useCallback(() => {
    dispatch({ type: "CANCEL_GAME" });
  }, []);

  const changeWord = useCallback(() => {
    dispatch({ type: "CHANGE_WORD" });
  }, []);

  useTickEverySecond(state.status === "running", () => {
    dispatch({ type: "TICK" });

    const activePlayer = state.players.find(
      (player) => player.playerId === state.currentTurnPlayerId
    );
    const remainingTime = activePlayer?.timeRemaining || 0;
    if (remainingTime === 10) {
      playClockTicking();
    } else if (remainingTime < 2 || remainingTime > 10) {
      stopClockTicking();
    }
  });

  const value = useMemo(
    () => ({
      state,
      initializeGame,
      startNextTurn,
      submitResult,
      finalizeGame,
      cancelGame,
      getCurrentPlayer: () =>
        state.players.find(
          (player) => player.playerId === state.currentTurnPlayerId
        ) || null,
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

  return <HeadsUpGameContext value={value}>{children}</HeadsUpGameContext>;
};

// Custom Hooks
export const useHeadsUpGame = () => {
  const context = use(HeadsUpGameContext);
  if (context === undefined) {
    throw new Error("useHeadsUpGame must be used within a HeadsUpGameProvider");
  }
  return context;
};
