import { Timestamp } from "@firebase/firestore";
import { GameStatus, isGameStatus } from "@/typed/schema/GameStatus";
import { GameOptions, isGameOptions } from "@/typed/schema/GameOptions";

export type Game = {
  id: string;
  status: GameStatus;
  ownerId: string;
  playerIds: string[];
  createdAt: Timestamp;
  options: GameOptions;
};

export const isGame = (value: any): value is Game => {
  return (
    typeof value === "object" &&
    typeof value.id === "string" &&
    isGameStatus(value.status) &&
    typeof value.ownerId === "string" &&
    Array.isArray(value.playerIds) &&
    value.playerIds.every((id: any) => typeof id === "string" && Boolean(id)) &&
    value.createdAt instanceof Timestamp &&
    isGameOptions(value.options)
  );
};