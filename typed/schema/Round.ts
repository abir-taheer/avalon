import { isVote, Vote } from "@/typed/schema/Vote";
import { isPlayer, Player } from "@/typed/schema/Player";

export type Round = {
  number: number;
  leader: Player;
  team: Player[];
  votes: Vote[];
  passed?: boolean;
  completed?: boolean;
};

export const isRound = (value: any): value is Round => {
  return (
    typeof value === "object" &&
    typeof value.number === "number" &&
    isPlayer(value.leader) &&
    Array.isArray(value.team) &&
    value.team.every(isPlayer) &&
    Array.isArray(value.votes) &&
    value.votes.every(isVote) &&
    (value.passed === undefined || typeof value.passed === "boolean") &&
    (value.completed === undefined || typeof value.completed === "boolean")
  );
};
