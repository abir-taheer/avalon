import { isVote, Vote } from "@/types/schema/Vote";
import { isPlayer, Player } from "@/types/schema/Player";
import { RealTimeUser } from "@/types/schema/RealTimeUser";
import { Game } from "@/types/schema/Game";

export enum RoundStatus {
  "team_selection" = "team_selection",
  "voting" = "voting",
  "completed" = "completed",
}

export type Round = {
  id: string;
  number: number;
  gameId: Game["id"];
  leaderId: RealTimeUser["uid"];
  teamPlayerIds: Array<RealTimeUser["uid"]>;
  votedPlayerIds: Array<RealTimeUser["uid"]>;
  status?: RoundStatus;
  previousFails: number;

  teamSize: number;
  createdAt: Date;
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
