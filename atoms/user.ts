import { RealTimeUser } from "@/schema";
import { User } from "firebase/auth";
import { atom } from "jotai";

export const authUserAtom = atom<User | null>(null);
export const userAtom = atom<RealTimeUser | null>(null);
export const idTokenAtom = atom(
  async (get) => await get(authUserAtom)?.getIdToken()
);
