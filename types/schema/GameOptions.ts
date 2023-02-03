import {
  OptionalCharacterOptions,
  isOptionalCharacterOptions,
} from "@/types/schema/OptionalCharacterOptions";

export type GameOptions = {
  optionalCharacters: OptionalCharacterOptions;
};

export const isGameOptions = (value: any): value is GameOptions => {
  return (
    typeof value === "object" &&
    typeof value.optionalCharacters !== "undefined" &&
    isOptionalCharacterOptions(value.optionalCharacters)
  );
};
