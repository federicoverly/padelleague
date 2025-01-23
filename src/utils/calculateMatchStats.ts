import { Match } from "../interfaces/interfaces";

export const calculateMatchStats = (
  playerId: string | undefined,
  matches: Match[]
) => {
  if (!playerId) return;
  let matchesWon = 0;

  const subtMatches = matches.flatMap((match) => match.subMatches);

  subtMatches.forEach((subMatch) => {
    if (subMatch.teams.teamOne.includes(playerId)) {
      if (subMatch.scores.teamOne > subMatch.scores.teamTwo) {
        matchesWon += 1;
      }
    } else if (subMatch.teams.teamTwo.includes(playerId)) {
      if (subMatch.scores.teamTwo > subMatch.scores.teamOne) {
        matchesWon += 1;
      }
    }
  });

  return {
    matchesWon: matchesWon,
    matches: matches.length,
    sets: subtMatches.length,
  };
};
