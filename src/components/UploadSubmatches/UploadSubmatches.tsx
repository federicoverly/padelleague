import { TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Player } from "../../interfaces/interfaces";
import { CustomButton } from "../CustomButton/CustomButton";
import styles from "./UploadSubmatches.module.css";

export interface UploadSubmatchesProps {
  completeSelectedPlayers: Player[];
  matchOneTeamOneScore: number;
  setMatchOneTeamOneScore: (value: number) => void;
  matchOneTeamTwoScore: number;
  setMatchOneTeamTwoScore: (value: number) => void;
  matchTwoTeamOneScore: number;
  setMatchTwoTeamOneScore: (value: number) => void;
  matchTwoTeamTwoScore: number;
  setMatchTwoTeamTwoScore: (value: number) => void;
  matchThreeTeamOneScore: number;
  setMatchThreeTeamOneScore: (value: number) => void;
  matchThreeTeamTwoScore: number;
  setMatchThreeTeamTwoScore: (value: number) => void;
  handleAddMatch: () => void;
  setStep: Dispatch<SetStateAction<"players" | "submatches">>;
}

export const UploadSubmatches = ({
  completeSelectedPlayers,
  matchOneTeamOneScore,
  setMatchOneTeamOneScore,
  matchOneTeamTwoScore,
  setMatchOneTeamTwoScore,
  matchTwoTeamOneScore,
  setMatchTwoTeamOneScore,
  matchTwoTeamTwoScore,
  setMatchTwoTeamTwoScore,
  matchThreeTeamOneScore,
  setMatchThreeTeamOneScore,
  matchThreeTeamTwoScore,
  setMatchThreeTeamTwoScore,
  handleAddMatch,
  setStep,
}: UploadSubmatchesProps) => {
  return (
    <div className={styles.container}>
      <Typography variant="h5">First Match </Typography>
      <div className={styles.matchAndScoreContainer}>
        <Typography>
          {completeSelectedPlayers[0].name} {completeSelectedPlayers[0].surname}
          {" and "}
          {completeSelectedPlayers[1].name} {completeSelectedPlayers[1].surname}
        </Typography>
        <TextField
          type="number"
          value={matchOneTeamOneScore}
          onChange={(e) => setMatchOneTeamOneScore(Number(e.target.value))}
          sx={{
            width: "5rem",
            color: "white",
            border: "1px solid white",
            input: {
              color: "white",
              textAlign: "center",
            },
          }}
        />
        <Typography>
          {completeSelectedPlayers[2].name} {completeSelectedPlayers[2].surname}
          {" and "}
          {completeSelectedPlayers[3].name} {completeSelectedPlayers[3].surname}
        </Typography>
        <TextField
          type="number"
          value={matchOneTeamTwoScore}
          onChange={(e) => setMatchOneTeamTwoScore(Number(e.target.value))}
          sx={{
            width: "5rem",
            color: "white",
            border: "1px solid white",
            input: {
              color: "white",
              textAlign: "center",
            },
          }}
        />
      </div>
      <Typography variant="h5">Second Match </Typography>
      <div className={styles.matchAndScoreContainer}>
        <Typography>
          {completeSelectedPlayers[0].name} {completeSelectedPlayers[0].surname}
          {" and "}
          {completeSelectedPlayers[2].name} {completeSelectedPlayers[2].surname}
        </Typography>
        <TextField
          type="number"
          value={matchTwoTeamOneScore}
          onChange={(e) => setMatchTwoTeamOneScore(Number(e.target.value))}
          sx={{
            width: "5rem",
            color: "white",
            border: "1px solid white",
            input: {
              color: "white",
              textAlign: "center",
            },
          }}
        />
        <Typography>
          {completeSelectedPlayers[1].name} {completeSelectedPlayers[1].surname}
          {" and "}
          {completeSelectedPlayers[3].name} {completeSelectedPlayers[3].surname}
        </Typography>
        <TextField
          type="number"
          value={matchTwoTeamTwoScore}
          onChange={(e) => setMatchTwoTeamTwoScore(Number(e.target.value))}
          sx={{
            width: "5rem",
            color: "white",
            border: "1px solid white",
            input: {
              color: "white",
              textAlign: "center",
            },
          }}
        />
      </div>
      <Typography variant="h5">Third Match </Typography>
      <div className={styles.matchAndScoreContainer}>
        <Typography>
          {completeSelectedPlayers[0].name} {completeSelectedPlayers[0].surname}
          {" and "}
          {completeSelectedPlayers[3].name} {completeSelectedPlayers[3].surname}
        </Typography>
        <TextField
          type="number"
          value={matchThreeTeamOneScore}
          onChange={(e) => setMatchThreeTeamOneScore(Number(e.target.value))}
          sx={{
            width: "5rem",
            color: "white",
            border: "1px solid white",
            input: {
              color: "white",
              textAlign: "center",
            },
          }}
        />
        <Typography>
          {completeSelectedPlayers[1].name} {completeSelectedPlayers[1].surname}
          {" and "}
          {completeSelectedPlayers[2].name} {completeSelectedPlayers[2].surname}
        </Typography>
        <TextField
          type="number"
          value={matchThreeTeamTwoScore}
          onChange={(e) => setMatchThreeTeamTwoScore(Number(e.target.value))}
          sx={{
            width: "5rem",
            color: "white",
            border: "1px solid white",
            input: {
              color: "white",
              textAlign: "center",
            },
          }}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <CustomButton
          title="Back to select players"
          type="secondary"
          onClick={() => setStep("players")}
        />
        <CustomButton
          onClick={handleAddMatch}
          title="Upload Match"
          type="primary"
        />
      </div>
    </div>
  );
};
