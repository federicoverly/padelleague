import React from "react";
import { PageLayout } from "../PageLayout/PageLayout";
import { Typography } from "@mui/material";
import { useAllPlayers } from "../../queries/playersQueries";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import styles from "./PlayersContainer.module.css";

export const PlayersContainer = () => {
  const players = useAllPlayers();

  return (
    <PageLayout>
      <div className={styles.container}>
        <Typography variant="h4">Players</Typography>
        {players.data &&
          players.data.length !== 0 &&
          players.data.map((player) => <PlayerCard player={player} />)}
      </div>
    </PageLayout>
  );
};
