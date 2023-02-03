import {
  isOptionalCharacter,
  OptionalCharacter,
  optionalCharacters,
} from "@/types/schema/OptionalCharacter";

export type Character = "minion" | "knight" | OptionalCharacter;

export const isCharacter = (value: any): value is Character => {
  return value === "minion" || value === "knight" || isOptionalCharacter(value);
};

export const characters = ["knight", "minion", ...optionalCharacters] as const;
