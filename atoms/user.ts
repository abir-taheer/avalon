import { RealTimeUser } from "@/types/schema";
import { User } from "firebase/auth";
import { atom } from "jotai";

// Sometimes changes to the user object from Firebase Auth
// Don't trigger updates in the auth listener
// Update the counter so that the auth listener useEffect will run again
export const authCounterAtom = atom(0);

export const authUserAtom = atom<User | null>(null);
export const userAtom = atom<RealTimeUser | null>(null);
export const idTokenAtom = atom<string | null>(null);
