import { Game } from "@/types/schema/Game";
import { isPlayer } from "@/types/schema/Player";
import { RealTimeUser } from "@/types/schema/RealTimeUser";
import { isVote } from "@/types/schema/Vote";

export enum RoundStatus {
  "team_selection" = "team_selection",
  "voting" = "voting",
  "mission_pending" = "mission_pending",
  "mission_failed" = "mission_failed",
  "mission_passed" = "mission_passed",

  "team_rejected" = "team_rejected",
}

export type Round = {
  id: string;
  number: number;
  gameId: Game["id"];
  leaderId: RealTimeUser["uid"];
  teamPlayerIds: Array<RealTimeUser["uid"]>;

  outcomes: boolean[];

  decidedMissionOutcomePlayerIds: Array<RealTimeUser["uid"]>;

  votedPlayerIds: Array<RealTimeUser["uid"]>;
  status: RoundStatus;
  previousRejections: number;

  teamSize: number;
  notes?: string;
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
