import { GameOptions } from "@/schema";
import { isCharacterOptions } from "@/utils/type-checker/isCharacterOptions";

const gameOptionPropSet = new Set(["characters"]);

export const isGameOptions = (value: unknown): value is GameOptions => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const hasOnlyRecognizedProps = Object.keys(value).every((key) =>
    gameOptionPropSet.has(key)
  );

  // @ts-expect-error
  const characterOptionsValid = isCharacterOptions(value.characters);

  return hasOnlyRecognizedProps && characterOptionsValid;
};
