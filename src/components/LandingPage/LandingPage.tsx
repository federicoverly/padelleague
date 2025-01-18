import { Typography } from "@mui/material";
import React from "react";
import { LeagueStands } from "../LeagueStands/LeagueStands";

export const LandingPage = () => {
  return (
    <div>
      <Typography variant="h3">Padel League</Typography>
      <LeagueStands />
    </div>
  );
};
