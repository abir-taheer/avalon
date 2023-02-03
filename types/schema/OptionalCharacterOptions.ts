import {
  OptionalCharacter,
  optionalCharacters,
} from "@/types/schema/OptionalCharacter";

export type OptionalCharacterOptions = Record<OptionalCharacter, boolean>;

export const isOptionalCharacterOptions = (
  value: any
): value is OptionalCharacterOptions => {
  return (
    typeof value === "object" &&
    optionalCharacters.every((character) => {
      return typeof value[character] === "boolean";
    })
  );
};
