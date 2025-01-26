import { Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Player } from "../../interfaces/interfaces";
import { CustomButton } from "../CustomButton/CustomButton";
import styles from "./UploadSubmatches.module.css";
import { UploadSubmatchCard } from "../UploadSubmatchCard/UploadSubmatchCard";

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
      <UploadSubmatchCard
        teamOne={`${completeSelectedPlayers[0].name} ${completeSelectedPlayers[0].surname} and ${completeSelectedPlayers[1].name} ${completeSelectedPlayers[1].surname}`}
        teamTwo={`${completeSelectedPlayers[2].name} ${completeSelectedPlayers[2].surname} and ${completeSelectedPlayers[3].name} ${completeSelectedPlayers[3].surname}`}
        scoreTeamOne={matchOneTeamOneScore}
        setScoreTeamOne={setMatchOneTeamOneScore}
        scoreTeamTwo={matchOneTeamTwoScore}
        setScoreTeamTwo={setMatchOneTeamTwoScore}
      />
      <Typography variant="h5">Second Match </Typography>
      <UploadSubmatchCard
        teamOne={`${completeSelectedPlayers[0].name} ${completeSelectedPlayers[0].surname} and ${completeSelectedPlayers[2].name} ${completeSelectedPlayers[2].surname}`}
        teamTwo={`${completeSelectedPlayers[1].name} ${completeSelectedPlayers[1].surname} and ${completeSelectedPlayers[3].name} ${completeSelectedPlayers[3].surname}`}
        scoreTeamOne={matchTwoTeamOneScore}
        setScoreTeamOne={setMatchTwoTeamOneScore}
        scoreTeamTwo={matchTwoTeamTwoScore}
        setScoreTeamTwo={setMatchTwoTeamTwoScore}
      />
      <Typography variant="h5">Third Match </Typography>
      <UploadSubmatchCard
        teamOne={`${completeSelectedPlayers[0].name} ${completeSelectedPlayers[0].surname} and ${completeSelectedPlayers[3].name} ${completeSelectedPlayers[3].surname}`}
        teamTwo={`${completeSelectedPlayers[1].name} ${completeSelectedPlayers[1].surname} and ${completeSelectedPlayers[2].name} ${completeSelectedPlayers[2].surname}`}
        scoreTeamOne={matchThreeTeamOneScore}
        setScoreTeamOne={setMatchThreeTeamOneScore}
        scoreTeamTwo={matchThreeTeamTwoScore}
        setScoreTeamTwo={setMatchThreeTeamTwoScore}
      />
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
