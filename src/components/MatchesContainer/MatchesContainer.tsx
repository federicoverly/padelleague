import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import { PageLayout } from "../PageLayout/PageLayout";
import { MatchCard } from "../MatchCard/MatchCard";
import { useAllMatches } from "../../queries/matchQueries";
import styles from "./MatchesContainer.module.css";

export const MatchesContainer = () => {
  const matches = useAllMatches();

  const sortedMatches = useMemo(() => {
    if (!matches.data) return;

    return matches.data.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [matches.data]);

  return (
    <PageLayout>
      <Typography variant="h4">Matches</Typography>
      <div className={styles.matchesContainer}>
        {sortedMatches &&
          sortedMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
      </div>
    </PageLayout>
  );
};
