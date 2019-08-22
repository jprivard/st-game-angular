export interface Assignment {
  ship: string;
  position: string;
}

export interface Character {
  id: number;
  rank: string;
  firstName: string;
  lastName: string;
  race: string;
  stardateOfBirth: string;
  assignments: Assignment[];
}
