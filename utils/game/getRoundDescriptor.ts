import { RoundStatus } from "@/types/schema";

export const getRoundDescriptor = (status: RoundStatus): string => {
  switch (status) {
    case RoundStatus.voting:
      return "Players are currently voting on the team for the mission.";

    case RoundStatus.team_rejected:
      return "This team was rejected by the players. The next leader will choose a new team.";

    case RoundStatus.mission_failed:
      return "This team was approved by the players but the mission failed";

    case RoundStatus.mission_passed:
      return "This team was approved by the players and the mission succeeded";

    case RoundStatus.mission_pending:
      return "This team was approved by the players and the mission is in progress. The next leader will choose a new team.";

    case RoundStatus.team_selection:
      return "The leader is currently choosing a team for the mission.";
  }
};
