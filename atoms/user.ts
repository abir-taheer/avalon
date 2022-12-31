import { atom } from "jotai";
import { User } from "@/schema";

export const userAtom = atom<User | null>(null);
