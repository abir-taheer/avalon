import { Timestamp } from "@firebase/firestore";
export type Player = {
  id: string;
  name: string;
  profilePicture?: string | null;
};

export type GameOptions = {
  merlin: boolean; // knows bad guys, is good
  assassin: boolean; // tries to guess merlin at the end of game, is bad
  percival: boolean; // knows merlin, is good
  mordred: boolean; // merlin doesn't know mordred, is bad
  oberon: boolean; // doesn't know merlin, is bad
  morgana: boolean; // looks like merlin, is bad. only if mordred is true
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
  shortId?: string;
  ownerId: string;
  players: Player[];
  playerIds: string[];
  createdAt: Timestamp;
  options: GameOptions;
};
