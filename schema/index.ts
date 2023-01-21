import { Timestamp } from "@firebase/firestore";

export type RealTimeUser = {
  uid: string;
  displayName?: string;
  photoURL?: string;
  active: Boolean;
};

export type Player = {
  id: string;
  name: string;
  profilePicture?: string | null;
};

export type Character =
  | "merlin"
  | "assassin"
  | "percival"
  | "morgana"
  | "mordred"
  | "oberon";

export type CharacterOptions = Record<Character, boolean>;

export type GameOptions = {
  characters: CharacterOptions;
};

export type Vote = {
  player: Player;
  approval: boolean;
};

export type Round = {
  number: number;
  leader: Player;
  team: Player[];
  votes: Vote[];
  passed?: boolean;
  completed?: boolean;
};

export type Game = {
  id: string;
  active: boolean;
  ownerId: string;
  playerIds: string[];
  createdAt: Timestamp;
  options: GameOptions;
};
