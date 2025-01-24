import React, { useMemo } from "react";
import { Match } from "../../interfaces/interfaces";
import { useAllPlayers } from "../../queries/playersQueries";
import { Typography } from "@mui/material";
import styles from "./MatchCard.module.css";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const players = useAllPlayers();

  const displayDate = useMemo(() => {
    const date = new Date(match.date);
    return date.toLocaleDateString();
  }, [match.date]);

  const playersFullName = useMemo(() => {
    if (!players.data) return;

    const playersInMatch = match.players.map((player) => {
      const playerData = players.data.find((p) => p.id === player);
      return `${playerData?.name} ${playerData?.surname}`;
    });

    return playersInMatch.join(", ");
  }, [match.players, players.data]);

  const submatchesDetails = useMemo(() => {
    if (!players.data) return;

    return match.subMatches.map((subMatch) => {
      const teamOne = subMatch.teams.teamOne.map((player) => {
        const playerData = players.data.find((p) => p.id === player);
        return `${playerData?.name} ${playerData?.surname}`;
      });

      const teamTwo = subMatch.teams.teamTwo.map((player) => {
        const playerData = players.data.find((p) => p.id === player);
        return `${playerData?.name} ${playerData?.surname}`;
      });

      return {
        teamOne,
        teamTwo,
        scores: `${subMatch.scores.teamOne} - ${subMatch.scores.teamTwo}`,
      };
    });
  }, [match.subMatches, players.data]);

  return (
    <div className={styles.matchCard}>
      <Typography variant="body1">{playersFullName}</Typography>
      <Typography variant="body2">{displayDate}</Typography>
      <Typography variant="body1">Submatches</Typography>
      {submatchesDetails &&
        submatchesDetails.map((submatch, index) => (
          <div key={index} className={styles.submatch}>
            <Typography variant="body2" textAlign="center">
              {submatch.teamOne.join(" & ")} vs {submatch.teamTwo.join(" & ")}{" "}
              {submatch.scores}
            </Typography>
          </div>
        ))}
    </div>
  );
};
