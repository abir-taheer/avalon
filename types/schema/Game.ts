import { Timestamp } from "@firebase/firestore";
import { GameStatus, isGameStatus } from "@/types/schema/GameStatus";
import { GameOptions, isGameOptions } from "@/types/schema/GameOptions";
import { RealTimeUser } from "@/types/schema/RealTimeUser";
import { Round } from "@/types/schema/Round";

export type IndependentGameProperties = {
  id: string;
  ownerId: RealTimeUser["uid"];
  playerIds: Array<RealTimeUser["uid"]>;

  createdAt: Timestamp;
  options: GameOptions;

  roundResults: [];
};

export type StartedGame = {
  status: GameStatus.started;
  currentRoundId: Round["id"];
} & IndependentGameProperties;

export type WaitingGame = {
  status: GameStatus.waiting;
  currentRoundId: null;
} & IndependentGameProperties;

export type CompletedGame = {
  status: GameStatus.completed;
  currentRoundId: null;
} & IndependentGameProperties;

export type Game = StartedGame | WaitingGame | CompletedGame;

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
