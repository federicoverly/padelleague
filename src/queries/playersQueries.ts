import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { Player } from "../interfaces/interfaces";
import { db } from "../utils/firebaseConfig";
import { useQuery } from "@tanstack/react-query";

export const getAllPlayers = async () => {
  const matchesQuery = query(collection(db, "players"));

  const matchesQuerySnapshot = getDocs(matchesQuery);

  const matchesQueryResponse = await matchesQuerySnapshot;

  const matches: Player[] = matchesQueryResponse.docs.map((match) => {
    return {
      id: match.id,
      name: match.data().name,
      surname: match.data().surname,
      email: match.data().email,
      image: match.data().image,
    };
  });

  return matches;
};

export function useAllPlayers() {
  return useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: () => getAllPlayers(),
  });
}

export const getPlayer = async (playerId: string | undefined) => {
  if (!playerId) return;

  const playerRef = doc(db, "players", playerId);

  const playerSnap = await getDoc(playerRef);

  if (!playerSnap.exists()) return;

  const player: Player = {
    id: playerSnap.id,
    name: playerSnap.data().name,
    surname: playerSnap.data().surname,
    email: playerSnap.data().email,
    image: playerSnap.data().image,
  };

  return player;
};

export function usePlayer(playerId: string | undefined) {
  return useQuery<Player | undefined>({
    queryKey: ["player", playerId],
    queryFn: () => getPlayer(playerId),
  });
}
