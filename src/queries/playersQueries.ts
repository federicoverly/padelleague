import { collection, getDocs, query } from "firebase/firestore";
import { Match, Player } from "../interfaces/interfaces";
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
