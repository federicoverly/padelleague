import React from "react";
import styles from "./UploadSubmatchCard.module.css";
import { Box, Typography } from "@mui/material";
import { ScoreInput } from "../ScoreInput/ScoreInput";

interface UploadSubmatchCardProps {
  teamOne: string;
  teamTwo: string;
  scoreTeamOne: number;
  setScoreTeamOne: (value: number) => void;
  scoreTeamTwo: number;
  setScoreTeamTwo: (value: number) => void;
}

export const UploadSubmatchCard = ({
  teamOne,
  teamTwo,
  scoreTeamOne,
  setScoreTeamOne,
  scoreTeamTwo,
  setScoreTeamTwo,
}: UploadSubmatchCardProps) => {
  return (
    <div className={styles.container}>
      <Box
        sx={{ flexGrow: 1, display: { xs: "none", md: "grid" } }}
        className={styles.container}
      >
        <Typography textAlign="end">{teamOne}</Typography>
        <ScoreInput score={scoreTeamOne} setScore={setScoreTeamOne} />
        <ScoreInput score={scoreTeamTwo} setScore={setScoreTeamTwo} />
        <Typography textAlign="start">{teamTwo}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <Typography>{teamOne}</Typography>
        <ScoreInput score={scoreTeamOne} setScore={setScoreTeamOne} />
        <Typography>{teamTwo}</Typography>
        <ScoreInput score={scoreTeamTwo} setScore={setScoreTeamTwo} />
      </Box>
    </div>
  );
};

UploadSubmatchCard.displayName = "UploadSubmatchCard";
