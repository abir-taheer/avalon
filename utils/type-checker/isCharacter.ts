import { Character } from "@/schema";
import { characters } from "@/forms/NewGameForm/useNewGameForm";

const charactersSet: Set<string> = new Set(characters);

export const isCharacter = (value: unknown): value is Character => {
  if (typeof value !== "string") {
    return false;
  }

  return charactersSet.has(value);
};