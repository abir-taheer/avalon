import { CharacterOptions } from "@/schema";
import { isCharacter } from "@/utils/type-checker/isCharacter";

export const isCharacterOptions = (
  value: unknown
): value is CharacterOptions => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return Object.keys(value).every(
    // @ts-expect-error
    (key) => isCharacter(key) && typeof value[key] === "boolean"
  );
};
