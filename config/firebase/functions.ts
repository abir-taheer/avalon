import { GameOptions } from "@/schema";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

export type CreateRoomFunction = (data: GameOptions) => Promise<string>;

export const createRoom = httpsCallable<GameOptions>(functions, "createRoom");
