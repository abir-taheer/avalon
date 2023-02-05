import { Timestamp } from "@firebase/firestore";
import { GameStatus, isGameStatus } from "@/types/schema/GameStatus";
import { GameOptions, isGameOptions } from "@/types/schema/GameOptions";
import { RealTimeUser } from "@/types/schema/RealTimeUser";

export type Game = {
  id: string;
  status: GameStatus;
  ownerId: RealTimeUser["uid"];
  playerIds: Array<RealTimeUser["uid"]>;
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
