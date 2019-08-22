export interface Assignment {
  ship: string;
  position: string;
  start: Date;
  end: Date;
}

export interface Character {
  id: number;
  rank: string;
  firstName: string;
  lastName: string;
  race: string;
  stardateOfBirth: string;
  assignments: {
    active: Assignment[];
    past: Assignment[];
  };
}
