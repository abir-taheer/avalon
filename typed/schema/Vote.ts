import { isPlayer, Player } from "@/typed/schema/Player";

export type Vote = {
  player: Player;
  approval: boolean;
};

export const isVote = (value: any): value is Vote => {
  return (
    typeof value === "object" &&
    isPlayer(value.player) &&
    typeof value.approval === "boolean"
  );
};
