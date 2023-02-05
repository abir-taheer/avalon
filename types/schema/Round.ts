import { isVote, Vote } from "@/types/schema/Vote";
import { isPlayer, Player } from "@/types/schema/Player";
import { RealTimeUser } from "@/types/schema/RealTimeUser";

export type Round = {
  number: number;
  leaderId: RealTimeUser["uid"];
  teamIds: Array<RealTimeUser["uid"]>;
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
