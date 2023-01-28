import { Character, characters } from "@/typed/schema/Character";

export type CharacterOptions = Record<Character, boolean>;

export const isCharacterOptions = (value: any): value is CharacterOptions => {
  return (
    typeof value === "object" &&
    characters.every((character) => {
      return typeof value[character] === "boolean";
    })
  );
};
