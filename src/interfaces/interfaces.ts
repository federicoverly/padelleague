export interface Player {
  id: string;
  name: string;
  surname: string;
  email: string;
  image: string;
}

export interface Match {
  id?: string;
  date: number;
  league: string;
  players: string[];
  subMatches: SubMatch[];
}

export interface SubMatch {
  teams: {
    teamOne: string[];
    teamTwo: string[];
  };
  scores: {
    teamOne: number;
    teamTwo: number;
  };
}

export interface BookedMatch {
  id: string;
  date: number;
  players: string[];
}
