import type { QuickPlayGameState, Team } from "@/contexts/games/types";

/**
 * Identify the next team to play in the game.
 * This will mutate the game state passed as argument.
 * @param state
 * @param resetTimerForEachRound - If there are more rounds to play, should it reset the timer for each round or not
 */
export const nextTurnIdentification = (
  state: QuickPlayGameState,
  resetTimerForEachRound: boolean = false
): QuickPlayGameState => {
  // find next team that not played in current round
  const nextTeam = state.teams.find(
    (team) => team.timeRemaining > 0 && !team.hasPlayedInRound
  );

  if (nextTeam) {
    // when there are still teams left to play in current round
    state.currentTurnTeamId = nextTeam.teamId;
    state.status = "waiting";
  } else {
    // when there is no team left to play in current round

    // when it's the last round, finalize the game
    if (state.currentRound >= state.settings.numberOfRounds) {
      state.status = "finalized";
      state.teams = calculateFinalScoreForTeams(
        state.teams,
        state.settings.timePerTeam,
        state.settings.numberOfRounds
      );
    } else {
      // when there are more rounds to play
      state.currentRound += 1;
      state.currentTurnTeamId = 1;
      state.teams = state.teams.map((team) => ({
        ...team,
        timeRemaining: resetTimerForEachRound
          ? state.settings.timePerTeam
          : team.timeRemaining,
        hasPlayedInRound: false,
      }));
      state.status = "waiting";
    }
  }

  return state;
};

const calculateFinalScore = ({
  timePerTeam,
  numberOfRounds,
  score,
  timeRemaining,
}: {
  timePerTeam: number;
  numberOfRounds: number;
  score: number;
  timeRemaining: number;
}) => {
  const timeConsumed = timePerTeam - timeRemaining + 0.001;
  const timePerRound = timePerTeam / numberOfRounds;
  const wrongGuesses = numberOfRounds - score;
  const timeRemainingAfterWrongGuesses =
    timeRemaining - wrongGuesses * timePerRound;

  // potential score for the remaining time
  const potentialScore = Math.max(
    0,
    (score / timeConsumed) * timeRemainingAfterWrongGuesses
  );

  const timeFactor = (score / (potentialScore + 0.00001)) * potentialScore;

  return (score + timeFactor).toFixed(1);
};

export const calculateFinalScoreForTeams = (
  teams: QuickPlayGameState["teams"],
  timePerTeam: number,
  numberOfRounds: number
): Team[] => {
  const teamsWithFinalScore = teams.map((team) => ({
    ...team,
    finalScore: calculateFinalScore({
      timePerTeam,
      numberOfRounds,
      score: team.score,
      timeRemaining: team.timeRemaining,
    }),
  }));

  return teamsWithFinalScore.sort((a, b) => {
    const scoreDiff = parseFloat(b.finalScore) - parseFloat(a.finalScore);
    if (scoreDiff !== 0) {
      return scoreDiff; // Sort by finalScore if not equal
    }
    return b.timeRemaining - a.timeRemaining; // Sort by timeRemaining if scores are equal
  });
};
