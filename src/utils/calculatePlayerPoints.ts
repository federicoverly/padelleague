import { Match } from "../interfaces/interfaces";

export function calculatePlayersPoints(playerId: string, matches: Match[]) {
  if (!matches || matches.length === 0) return 100;

  const matchesWithPoints = matches.map((match) => {
    let points = 0;
    let matchesWon = 0;

    const subtMatches = match.subMatches;
    subtMatches.forEach((subMatch) => {
      if (subMatch.teams.teamOne.includes(playerId)) {
        if (subMatch.scores.teamOne > subMatch.scores.teamTwo) {
          matchesWon += 1;
          points = points + 1;
          if (subMatch.scores.teamOne === 6 && subMatch.scores.teamTwo === 0) {
            points = points + 2;
          }
        } else if (subMatch.scores.teamOne < subMatch.scores.teamTwo) {
          if (subMatch.scores.teamOne === 0 && subMatch.scores.teamTwo === 6) {
            points = points - 2;
          }
        }
      } else if (subMatch.teams.teamTwo.includes(playerId)) {
        if (subMatch.scores.teamTwo > subMatch.scores.teamOne) {
          points = points + 1;
          matchesWon += 1;
          if (subMatch.scores.teamTwo === 6 && subMatch.scores.teamOne === 0) {
            points = points + 2;
          }
        } else if (subMatch.scores.teamOne < subMatch.scores.teamTwo) {
          if (subMatch.scores.teamTwo === 0 && subMatch.scores.teamOne === 6) {
            points = points - 2;
          }
        }
      }
    });
    if (matchesWon === subtMatches.length) {
      points += 1;
    }
    if (matchesWon === 0) {
      points = points - 1;
    }
    return {
      ...match,
      points,
    };
  });

  const totalPoints =
    100 +
    matchesWithPoints.reduce((acc, match) => {
      return acc + match.points;
    }, 0);

  return totalPoints;
}
