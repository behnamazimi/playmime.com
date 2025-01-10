export type GameStatus = "initialized" | "waiting" | "running" | "finalized";

type BaseGameSettings = {
  numberOfTeams: number;
  timePerTeam: number; // in seconds
};

type BaseTeam = {
  teamId: number;
  score: number;
  timeRemaining: number; // in seconds
};

export type OneWordPerTurnGameSettings = BaseGameSettings & {
  numberOfRounds: number;
};

export type QuickPlayGameSettings = BaseGameSettings;

export type Team = BaseTeam & {
  hasPlayedInRound: boolean;
  finalScore: string;
};

export type QuickPlayTeam = BaseTeam;

export type BaseGameState<TeamType> = {
  gameId: string;
  status: GameStatus;
  settings: BaseGameSettings;
  currentTurnTeamId: number;
  teams: TeamType[];
  wordPool: string[];
  currentWord: string | null;
};

export type OneWordPerTurnGameState = BaseGameState<Team> & {
  settings: OneWordPerTurnGameSettings;
  currentRound: number;
};

export type QuickPlayGameState = BaseGameState<QuickPlayTeam> & {
  settings: QuickPlayGameSettings;
};
