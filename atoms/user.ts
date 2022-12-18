import { atom } from "jotai";
import { User } from "@firebase/auth";

export const userAtom = atom<User | null>(null);
