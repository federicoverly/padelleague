import React, { useMemo, useState } from "react";
import { useAllMatchesByLeague } from "../../queries/matchQueries";
import { calculatePlayersPoints } from "../../utils/calculatePlayerPoints";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./LeagueStands.module.css";
import { useAllPlayers } from "../../queries/playersQueries";
import { CustomButton } from "../CustomButton/CustomButton";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import { calculateMatchStats } from "../../utils/calculateMatchStats";

export const LeagueStands = () => {
  const navigate = useNavigate();

  const currentLeague = useMemo(() => {
    const year = new Date().getFullYear();
    const quarter = Math.floor((new Date().getMonth() + 3) / 3);
    return `${year} Q${quarter}`;
  }, []);

  const [league, setLeague] = useState<string>(currentLeague);

  const matches = useAllMatchesByLeague(league);
  const players = useAllPlayers();

  const playersWithPointsAndMatches = useMemo(() => {
    if (!players.data || !matches.data || matches.data.length === 0) return;

    const playersAndPoints = players.data?.map((player) => {
      const matchesPlayed = matches.data?.filter((match) =>
        match.players.includes(player.id)
      );

      const playerStats = calculateMatchStats(player.id, matchesPlayed || []);

      if (!playerStats) {
        return {
          ...player,
          points: 0,
          matches: [],
          winRate: 0,
          gamesWinRate: 0,
        };
      }

      const matchWinRate = (
        (playerStats.matchesWon / playerStats.matchesPlayed) *
        100
      ).toFixed(2);

      const matchGamesWinRate = (
        (playerStats.gamesWon / playerStats.gamesPlayed) *
        100
      ).toFixed(2);

      return {
        ...player,
        points: calculatePlayersPoints(
          player.id,
          matches.data?.filter((match) => match.players.includes(player.id)) ||
            []
        ),
        matches: matchesPlayed,
        winRate: Number(matchWinRate),
        gamesWinRate: Number(matchGamesWinRate),
      };
    });

    return playersAndPoints?.sort((a, b) => {
      if (b.points === a.points) {
        if (b.winRate === a.winRate) {
          return a.gamesWinRate - b.gamesWinRate;
        }
        return a.winRate - b.winRate;
      } else return b.points - a.points;
    });
  }, [players.data, matches.data]);

  const playersWithMatches = useMemo(() => {
    const players = playersWithPointsAndMatches?.filter(
      (player) => player.matches?.length !== 0
    );

    return players;
  }, [playersWithPointsAndMatches]);

  const playersWithoutMatches = useMemo(() => {
    if (!players.data) return;
    if (!matches.data || matches.data.length === 0) return players.data;

    const playersWithoutMatchesInLeague = players.data?.filter((player) => {
      const matchesPlayed = matches.data?.filter((match) =>
        match.players.includes(player.id)
      );

      if (!matchesPlayed || matchesPlayed.length === 0) return player;
      return undefined;
    });

    return playersWithoutMatchesInLeague;
  }, [matches.data, players.data]);

  const leagueOptions = useMemo(() => {
    const year = new Date().getFullYear();
    const quarters = ["Q1", "Q2", "Q3", "Q4"];
    const leagues = quarters.map((quarter) => `${year} ${quarter}`);
    return leagues;
  }, []);

  return (
    <div className={styles.container}>
      <FormControl fullWidth>
        <Typography variant="h6" textAlign="center">
          Select league
        </Typography>
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
      </FormControl>
      <Typography variant="h5">Current Standings</Typography>
      <div className={styles.listHeader}>
        <div>Position</div>
        <div>Name</div>
        <div>Points</div>
        <div>Matches</div>
      </div>
      {playersWithMatches?.map((player, index) => (
        <div key={player.id} className={styles.listItem}>
          <div>{index + 1}</div>
          <PlayerCard player={player} />
          <div>{player.points}</div>
          <div>{player.matches?.length}</div>
        </div>
      ))}
      <Typography variant="h6">Players without matches</Typography>
      <div>
        {playersWithoutMatches?.map((player) => (
          <PlayerCard player={player} key={player.id} />
        ))}
      </div>
      <CustomButton
        type="primary"
        title="Upload match"
        onClick={() => navigate("/upload-match")}
      />
    </div>
  );
};

LeagueStands.displayName = "LeagueStands";
