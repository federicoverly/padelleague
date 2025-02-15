import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../../queries/playersQueries";
import { PageLayout } from "../PageLayout/PageLayout";
import { usePlayerMatches } from "../../queries/matchQueries";
import { calculateMatchStats } from "../../utils/calculateMatchStats";
import styles from "./PlayerDetails.module.css";
import { Typography } from "@mui/material";
import { playerImages } from "../../assets/playerImages/playerImages";
import placeholder from "../../assets/playerImages/placeholder.png";

export const PlayerDetails = () => {
  const { playerId } = useParams();

  const player = usePlayer(playerId);

  const matches = usePlayerMatches(playerId);

  const playerStats = calculateMatchStats(playerId, matches.data || []);

  const calculateWinRate = useMemo(() => {
    if (!playerStats) return;

    const matchWinRate = (
      (playerStats.matchesWon / playerStats.matchesPlayed) *
      100
    ).toFixed(2);

    const matchGamesWinRate = (
      (playerStats.gamesWon / playerStats.gamesPlayed) *
      100
    ).toFixed(2);

    return { winRate: matchWinRate, gamesWinRate: matchGamesWinRate };
  }, [playerStats]);

  const playerImage = useMemo(() => {
    if (!player.data) return;

    return playerImages.find((image) => image.id === player.data?.id)?.photo;
  }, [player.data]);

  return (
    <PageLayout>
      {player.data && (
        <div>
          <div className={styles.nameAndImageContainer}>
            <Typography variant="h4">
              {player.data.name} {player.data.surname}
            </Typography>
            <img
              src={playerImage ?? placeholder}
              alt="playerimage"
              className={styles.image}
            />
          </div>
          <div>
            <Typography variant="h6">Stats</Typography>
            {playerStats && (
              <div className={styles.statsContainer}>
                <div>Matches: {playerStats.matchesPlayed}</div>
                <div>Matches Won: {playerStats.matchesWon}</div>
                <div>Matches Win Rate: {calculateWinRate?.winRate}%</div>
                <div>Games Win Rate: {calculateWinRate?.gamesWinRate}%</div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};
