import { GameOptions } from "@/schema";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./app";

const functions = getFunctions(app);

export type CreateRoomFunction = (data: GameOptions) => Promise<string>;

export const createRoom = httpsCallable<GameOptions>(functions, "createRoom");
