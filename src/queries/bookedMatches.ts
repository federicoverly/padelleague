import { useQuery } from "@tanstack/react-query";
import { query, collection, getDocs } from "firebase/firestore";
import { BookedMatch } from "../interfaces/interfaces";
import { db } from "../utils/firebaseConfig";

const getAllBookedMatches = async () => {
  const matchesQuery = query(collection(db, "bookedMatches"));

  const matchesQuerySnapshot = getDocs(matchesQuery);

  const matchesQueryResponse = await matchesQuerySnapshot;

  const matches: BookedMatch[] = matchesQueryResponse.docs.map((match) => {
    return {
      id: match.id,
      date: match.data().date,
      players: match.data().players,
    };
  });

  return matches;
};

export function useAllBookedMatches() {
  return useQuery<BookedMatch[]>({
    queryKey: ["matches"],
    queryFn: () => getAllBookedMatches(),
  });
}
