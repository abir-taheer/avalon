import { atom } from "jotai";
import { User } from "firebase/auth";
import { RealTimeUser } from "@/schema";

export const authUserAtom = atom<User | null>(null);
export const userAtom = atom<RealTimeUser | null>(null);
