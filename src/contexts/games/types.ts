import { Word } from "@/types";

export type GameStatus = "initialized" | "waiting" | "running" | "finalized";

type BaseGameSettings = {
  numberOfTeams: number;
  timePerTeam: number; // in seconds
  numberOfRounds: number;
};

type BaseTeam = {
  teamId: number;
  score: number;
  timeRemaining: number; // in seconds
  hasPlayedInRound: boolean;
  finalScore: string;
};

export type OneWordPerTurnGameSettings = BaseGameSettings;

export type QuickPlayGameSettings = BaseGameSettings;

export type Team = BaseTeam;

export type QuickPlayTeam = BaseTeam;

export type BaseGameState<TeamType> = {
  gameId: string;
  status: GameStatus;
  settings: BaseGameSettings;
  currentTurnTeamId: number;
  teams: TeamType[];
  wordPool: Word[];
  currentWord: Word | null;
  currentRound: number;
};

export type OneWordPerTurnGameState = BaseGameState<Team> & {
  settings: OneWordPerTurnGameSettings;
};

export type QuickPlayGameState = BaseGameState<QuickPlayTeam> & {
  settings: QuickPlayGameSettings;
};
