import React, { useMemo } from "react";
import { useAllMatches } from "../../queries/matchQueries";
import { calculatePlayersPoints } from "../../utils/calculatePlayerPoints";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./LeagueStands.module.css";
import { useAllPlayers } from "../../queries/playersQueries";
import { CustomButton } from "../CustomButton/CustomButton";

export const LeagueStands = () => {
  const navigate = useNavigate();

  const matches = useAllMatches();
  const players = useAllPlayers();

  const playersWithPointsAndMatches = useMemo(() => {
    if (!players.data || !matches.data) return;

    const playersAndPoints = players.data?.map((player) => {
      return {
        ...player,
        points: calculatePlayersPoints(player.id, matches.data || []),
        matches: matches.data?.filter((match) =>
          match.players.includes(player.id)
        ),
      };
    });

    return playersAndPoints?.sort((a, b) => b.points - a.points);
  }, [players.data, matches.data]);

  return (
    <div className={styles.container}>
      <Typography variant="h5">Current Standings</Typography>
      <div className={styles.listHeader}>
        <div>Position</div>
        <div>Name</div>
        <div>Points</div>
        <div>Matches</div>
      </div>
      {playersWithPointsAndMatches?.map((player, index) => (
        <div key={player.id} className={styles.listItem}>
          <div>{index + 1}</div>
          <div>
            {player.name} {player.surname}
          </div>
          <div>{player.points}</div>
          <div>{player.matches?.length}</div>
        </div>
      ))}
      <CustomButton
        type="primary"
        title="Upload match"
        onClick={() => navigate("/upload-match")}
      />
    </div>
  );
};

LeagueStands.displayName = "LeagueStands";
