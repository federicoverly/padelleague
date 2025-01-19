import React from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../../queries/playersQueries";
import { PageLayout } from "../PageLayout/PageLayout";
import { usePlayerMatches } from "../../queries/matchQueries";

export const PlayerDetails = () => {
  const { playerId } = useParams();

  const player = usePlayer(playerId);

  const matches = usePlayerMatches(playerId);

  return (
    <PageLayout>
      {player.data && (
        <div>
          <div>
            <div>{player.data.name}</div>
            <div>{player.data.surname}</div>
            <img src={player.data.image} alt="player" />
          </div>
          <div>
            <h2>Stats</h2>
            <div>Stats detail will come soon</div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
