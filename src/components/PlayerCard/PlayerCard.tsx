import React from "react";
import { Player } from "../../interfaces/interfaces";
import styles from "./PlayerCard.module.css";
import { useNavigate } from "react-router-dom";

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/players/${player.id}`)}
    >
      <div>{player.name}</div>
      <div>{player.surname}</div>
    </div>
  );
};
