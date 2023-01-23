import { atom } from "jotai";
import { ReactNode } from "react";

export type Dialog<PropType> = {
  Component: ReactNode;
};

export const dialogsAtom = atom<Dialog<unknown>[]>([]);
