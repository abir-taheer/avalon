import { RealTimeUser } from "@/types/schema/RealTimeUser";

export type MissionOutcome = {
  playerId: RealTimeUser["uid"];
  passed: boolean;
};

export const isMissionOutcome = (value: any): value is MissionOutcome => {
  return (
    typeof value === "object" &&
    typeof value.playerId === "string" &&
    typeof value.passed === "boolean"
  );
};
