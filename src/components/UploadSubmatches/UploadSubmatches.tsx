import { Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Player } from "../../interfaces/interfaces";
import { CustomButton } from "../CustomButton/CustomButton";
import styles from "./UploadSubmatches.module.css";
import { ScoreInput } from "../ScoreInput/ScoreInput";

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
        <ScoreInput
          score={matchOneTeamOneScore}
          setScore={setMatchOneTeamOneScore}
        />
        <Typography>
          {completeSelectedPlayers[2].name} {completeSelectedPlayers[2].surname}
          {" and "}
          {completeSelectedPlayers[3].name} {completeSelectedPlayers[3].surname}
        </Typography>
        <ScoreInput
          score={matchOneTeamTwoScore}
          setScore={setMatchOneTeamTwoScore}
        />
      </div>

      <Typography variant="h5">Second Match </Typography>
      <div className={styles.matchAndScoreContainer}>
        <Typography>
          {completeSelectedPlayers[0].name} {completeSelectedPlayers[0].surname}
          {" and "}
          {completeSelectedPlayers[2].name} {completeSelectedPlayers[2].surname}
        </Typography>
        <ScoreInput
          score={matchTwoTeamOneScore}
          setScore={setMatchTwoTeamOneScore}
        />
        <Typography>
          {completeSelectedPlayers[1].name} {completeSelectedPlayers[1].surname}
          {" and "}
          {completeSelectedPlayers[3].name} {completeSelectedPlayers[3].surname}
        </Typography>
        <ScoreInput
          score={matchTwoTeamTwoScore}
          setScore={setMatchTwoTeamTwoScore}
        />
      </div>
      <Typography variant="h5">Third Match </Typography>
      <div className={styles.matchAndScoreContainer}>
        <Typography>
          {completeSelectedPlayers[0].name} {completeSelectedPlayers[0].surname}
          {" and "}
          {completeSelectedPlayers[3].name} {completeSelectedPlayers[3].surname}
        </Typography>
        <ScoreInput
          score={matchThreeTeamOneScore}
          setScore={setMatchThreeTeamOneScore}
        />
        <Typography>
          {completeSelectedPlayers[1].name} {completeSelectedPlayers[1].surname}
          {" and "}
          {completeSelectedPlayers[2].name} {completeSelectedPlayers[2].surname}
        </Typography>
        <ScoreInput
          score={matchThreeTeamTwoScore}
          setScore={setMatchThreeTeamTwoScore}
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
