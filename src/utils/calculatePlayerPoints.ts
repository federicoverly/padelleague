import { Match } from "../interfaces/interfaces";

export function calculatePlayersPoints(playerId: string, matches: Match[]) {
  if (!matches || matches.length === 0) return 0;

  let points = 0;
  let matchesWon = 0;

  const subtMatches = matches.flatMap((match) => match.subMatches);

  subtMatches.forEach((subMatch) => {
    if (subMatch.teams.teamOne.includes(playerId)) {
      if (subMatch.scores.teamOne > subMatch.scores.teamTwo) {
        if (subMatch.scores.teamOne === 6 && subMatch.scores.teamTwo === 0) {
          points += 3;
          matchesWon += 1;
        }
        points += 1;
      } else if (subMatch.scores.teamOne < subMatch.scores.teamTwo) {
        if (subMatch.scores.teamOne === 0 && subMatch.scores.teamTwo === 6) {
          points = points - 1;
        }
      }
    } else if (subMatch.teams.teamTwo.includes(playerId)) {
      if (subMatch.scores.teamTwo > subMatch.scores.teamOne) {
        if (subMatch.scores.teamTwo === 6 && subMatch.scores.teamOne === 0) {
          points += 3;
          matchesWon += 1;
        }
        points += 1;
      } else if (subMatch.scores.teamOne < subMatch.scores.teamTwo) {
        if (subMatch.scores.teamTwo === 0 && subMatch.scores.teamOne === 6) {
          points = points - 1;
        }
      }
    }
    if (matchesWon === subtMatches.length) {
      points += 1;
    }
  });

  return points;
}
