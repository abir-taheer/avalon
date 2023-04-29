import { Game } from "@/types/schema";
import { createContext, useContext } from "react";

export const GameContext = createContext<Game | null>(null);

export const useGameContext = (): Game => {
  const value = useContext(GameContext);

  if (!value) {
    throw new Error("GameContext must be used within a GameProvider");
  }

  return value;
};
