import React, { useCallback, useMemo, useState } from "react";
import { useAllPlayers } from "../../queries/playersQueries";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useAddMatch } from "../../queries/matchQueries";
import { PageLayout } from "../PageLayout/PageLayout";
import { SelectMatchPlayers } from "../SelectMatchPlayers/SelectMatchPlayers";
import { UploadSubmatches } from "../UploadSubmatches/UploadSubmatches";
import { useNavigate } from "react-router-dom";
import styles from "./UploadMatchContainer.module.css";
import { CustomButton } from "../CustomButton/CustomButton";

export const UploadMatchContainer = () => {
  const [step, setStep] = useState<"players" | "submatches">(`players`);

  const [league, setLeague] = useState<string>("");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [matchOneTeamOneScore, setMatchOneTeamOneScore] = useState<number>(0);
  const [matchOneTeamTwoScore, setMatchOneTeamTwoScore] = useState<number>(0);
  const [matchTwoTeamOneScore, setMatchTwoTeamOneScore] = useState<number>(0);
  const [matchTwoTeamTwoScore, setMatchTwoTeamTwoScore] = useState<number>(0);
  const [matchThreeTeamOneScore, setMatchThreeTeamOneScore] =
    useState<number>(0);
  const [matchThreeTeamTwoScore, setMatchThreeTeamTwoScore] =
    useState<number>(0);

  const subMatchesWithScores = useMemo(() => {
    return [
      {
        scores: {
          teamOne: matchOneTeamOneScore,
          teamTwo: matchOneTeamTwoScore,
        },
        teams: {
          teamOne: [selectedPlayers[0], selectedPlayers[1]],
          teamTwo: [selectedPlayers[2], selectedPlayers[3]],
        },
      },
      {
        scores: {
          teamOne: matchTwoTeamOneScore,
          teamTwo: matchTwoTeamTwoScore,
        },
        teams: {
          teamOne: [selectedPlayers[0], selectedPlayers[2]],
          teamTwo: [selectedPlayers[1], selectedPlayers[3]],
        },
      },
      {
        scores: {
          teamOne: matchThreeTeamOneScore,
          teamTwo: matchThreeTeamTwoScore,
        },
        teams: {
          teamOne: [selectedPlayers[0], selectedPlayers[3]],
          teamTwo: [selectedPlayers[1], selectedPlayers[2]],
        },
      },
    ];
  }, [
    matchOneTeamOneScore,
    matchOneTeamTwoScore,
    matchThreeTeamOneScore,
    matchThreeTeamTwoScore,
    matchTwoTeamOneScore,
    matchTwoTeamTwoScore,
    selectedPlayers,
  ]);

  const players = useAllPlayers();

  const navigate = useNavigate();

  const sortedPlayers = useMemo(() => {
    return players.data?.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }, [players.data]);

  const leagueOptions = useMemo(() => {
    const year = new Date().getFullYear();
    const quarters = ["Q1", "Q2", "Q3", "Q4"];
    const leagues = quarters.map((quarter) => `${year} ${quarter}`);
    return leagues;
  }, []);

  const completeSelectedPlayers = useMemo(() => {
    if (!players.data) return [];
    return players.data?.filter((player) =>
      selectedPlayers.includes(player.id)
    );
  }, [players.data, selectedPlayers]);

  const addNewPlayer = useCallback((event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setSelectedPlayers(typeof value === "string" ? value.split(",") : value);
  }, []);

  const addMatch = useAddMatch({
    id: "",
    date: Date.now(),
    players: selectedPlayers,
    league: league,
    subMatches: subMatchesWithScores,
  });

  const handleAddMatch = useCallback(() => {
    if (!selectedPlayers.length || selectedPlayers.length < 4 || league === "")
      return;

    addMatch.mutate();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [selectedPlayers.length, league, addMatch, navigate]);

  return (
    <PageLayout>
      <div className={styles.container}>
        {step === "players" && (
          <div>
            <Typography variant="h6" textAlign="center">
              Select league
            </Typography>
            <FormControl fullWidth>
              <Select
                labelId="league"
                id="league"
                label="League"
                value={league}
                onChange={(event) => setLeague(event.target.value)}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  border: "1px solid white",
                  width: "80vw",
                }}
              >
                {leagueOptions.map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <SelectMatchPlayers
                players={players.data || []}
                selectedPlayers={selectedPlayers}
                addNewPlayer={addNewPlayer}
                setStep={setStep}
                sortedPlayers={sortedPlayers || []}
              />
            </FormControl>
          </div>
        )}
        {step === "submatches" && (
          <UploadSubmatches
            completeSelectedPlayers={completeSelectedPlayers}
            matchOneTeamOneScore={matchOneTeamOneScore}
            setMatchOneTeamOneScore={setMatchOneTeamOneScore}
            matchOneTeamTwoScore={matchOneTeamTwoScore}
            setMatchOneTeamTwoScore={setMatchOneTeamTwoScore}
            matchTwoTeamOneScore={matchTwoTeamOneScore}
            setMatchTwoTeamOneScore={setMatchTwoTeamOneScore}
            matchTwoTeamTwoScore={matchTwoTeamTwoScore}
            setMatchTwoTeamTwoScore={setMatchTwoTeamTwoScore}
            matchThreeTeamOneScore={matchThreeTeamOneScore}
            setMatchThreeTeamOneScore={setMatchThreeTeamOneScore}
            matchThreeTeamTwoScore={matchThreeTeamTwoScore}
            setMatchThreeTeamTwoScore={setMatchThreeTeamTwoScore}
            handleAddMatch={handleAddMatch}
            setStep={setStep}
          />
        )}
        {step === "players" && (
          <CustomButton
            onClick={() => setStep("submatches")}
            disabled={selectedPlayers.length < 4 || league === ""}
            type="primary"
            title="Continue"
          />
        )}
      </div>
    </PageLayout>
  );
};
