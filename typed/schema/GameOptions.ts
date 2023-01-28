import {
  CharacterOptions,
  isCharacterOptions,
} from "@/typed/schema/CharacterOptions";

export type GameOptions = {
  characters: CharacterOptions;
};

export const isGameOptions = (value: any): value is GameOptions => {
  return (
    typeof value === "object" &&
    typeof value.characters !== "undefined" &&
    isCharacterOptions(value.characters)
  );
};
