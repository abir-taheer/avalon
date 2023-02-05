import { isPlayer } from "@/types/schema/Player";
import { RealTimeUser } from "@/types/schema/RealTimeUser";

export type Vote = {
  playerId: RealTimeUser["uid"];
  approval: boolean;
};

export const isVote = (value: any): value is Vote => {
  return (
    typeof value === "object" &&
    isPlayer(value.player) &&
    typeof value.approval === "boolean"
  );
};
