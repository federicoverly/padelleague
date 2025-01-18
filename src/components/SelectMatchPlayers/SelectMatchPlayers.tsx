import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { CustomButton } from "../CustomButton/CustomButton";
import styles from "./SelectMatchPlayers.module.css";
import { Player } from "../../interfaces/interfaces";

export interface SelectMatchPlayersProps {
  players: Player[];
  selectedPlayers: string[];
  addNewPlayer: (event: SelectChangeEvent<string[]>, child: ReactNode) => void;
  setStep: Dispatch<SetStateAction<"players" | "submatches">>;
  sortedPlayers: Player[];
}

export const SelectMatchPlayers = ({
  players,
  sortedPlayers,
  selectedPlayers,
  setStep,
  addNewPlayer,
}: SelectMatchPlayersProps) => {
  return (
    <div className={styles.selectPlayersContainer}>
      <Typography variant="h4">Select players</Typography>
      {sortedPlayers && sortedPlayers.length > 0 && (
        <div className={styles.selectPlayers}>
          <FormControl fullWidth>
            <Select
              labelId="selectedPlayers"
              id="selectedPlayers"
              label="Selected Players"
              multiple
              disabled={sortedPlayers.length === 0}
              value={selectedPlayers}
              onChange={addNewPlayer}
              renderValue={(selected) => {
                const playersInMatch = players
                  ?.filter((player) => selected.includes(player.id))
                  .map((player) => `${player.name} ${player.surname}`);

                if (!selected) return "No players selected";

                return <div>{playersInMatch?.join(", ")}</div>;
              }}
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                border: "1px solid white",
                width: "80vw",
              }}
            >
              {sortedPlayers.map((player) => (
                <MenuItem
                  value={player.id}
                  key={player.id}
                  disabled={
                    selectedPlayers.length >= 4 &&
                    !selectedPlayers.includes(player.id)
                  }
                >
                  <Checkbox checked={selectedPlayers.includes(player.id)} />
                  {player.name} {player.surname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <CustomButton
            onClick={() => setStep("submatches")}
            disabled={selectedPlayers.length < 4}
            type="primary"
            title="Continue"
          />
        </div>
      )}
    </div>
  );
};
