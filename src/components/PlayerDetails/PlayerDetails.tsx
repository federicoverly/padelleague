import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../../queries/playersQueries";
import { PageLayout } from "../PageLayout/PageLayout";
import { usePlayerMatches } from "../../queries/matchQueries";
import { calculateMatchStats } from "../../utils/calculateMatchStats";
import styles from "./PlayerDetails.module.css";
import { Typography } from "@mui/material";

export const PlayerDetails = () => {
  const { playerId } = useParams();

  const player = usePlayer(playerId);

  const matches = usePlayerMatches(playerId);

  const playerStats = calculateMatchStats(playerId, matches.data || []);

  const calculateWinRate = useMemo(() => {
    if (!playerStats) return;

    const winRate = ((playerStats.matchesWon / playerStats.sets) * 100).toFixed(
      2
    );
    return winRate;
  }, [playerStats]);

  return (
    <PageLayout>
      {player.data && (
        <div>
          <div>
            <Typography variant="h4">
              {player.data.name} {player.data.surname}
            </Typography>
          </div>
          <div>
            <Typography variant="h6">Stats</Typography>
            {playerStats && (
              <div className={styles.statsContainer}>
                <div>Matches: {playerStats.matches}</div>
                <div>Sets: {playerStats.sets}</div>
                <div>Sets won: {playerStats.matchesWon}</div>
                <div>Win rate: {calculateWinRate}%</div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};
