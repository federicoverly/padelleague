import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Match } from "../interfaces/interfaces";
import { db } from "../utils/firebaseConfig";
import { useMutation, useQuery } from "@tanstack/react-query";

const getAllMatches = async () => {
  const matchesQuery = query(collection(db, "matches"));

  const matchesQuerySnapshot = getDocs(matchesQuery);

  const matchesQueryResponse = await matchesQuerySnapshot;

  const matches: Match[] = matchesQueryResponse.docs.map((match) => {
    return {
      id: match.id,
      date: match.data().date,
      league: match.data().league,
      players: match.data().players,
      subMatches: match.data().subMatches,
    };
  });

  return matches;
};

export function useAllMatches() {
  return useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: () => getAllMatches(),
  });
}

const addMatch = async (match: Match) => {
  const docRef = await addDoc(collection(db, "matches"), match);

  return docRef;
};

export const useAddMatch = (match: Match) => {
  return useMutation({
    mutationKey: ["addMatch"],
    mutationFn: () => addMatch(match),
  });
};

export const getPlayerMatches = async (playerId: string | undefined) => {
  if (!playerId) return [];

  const matchesQuery = query(
    collection(db, "matches"),
    where("players", "array-contains", playerId)
  );

  const matchesQuerySnapshot = getDocs(matchesQuery);

  const matchesQueryResponse = await matchesQuerySnapshot;

  const matches: Match[] = matchesQueryResponse.docs.map((match) => {
    return {
      id: match.id,
      date: match.data().date,
      league: match.data().league,
      players: match.data().players,
      subMatches: match.data().subMatches,
    };
  });

  return matches;
};

export function usePlayerMatches(playerId: string | undefined) {
  return useQuery<Match[]>({
    queryKey: ["players-matches", playerId],
    queryFn: () => getPlayerMatches(playerId),
  });
}
