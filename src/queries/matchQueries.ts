import { addDoc, collection, getDocs, query } from "firebase/firestore";
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
  console.log(match);
  const docRef = await addDoc(collection(db, "matches"), match);

  return docRef;
};

export const useAddMatch = (match: Match) => {
  return useMutation({
    mutationKey: ["addMatch"],
    mutationFn: () => addMatch(match),
  });
};
