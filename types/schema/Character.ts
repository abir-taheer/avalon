import {
  isOptionalCharacter,
  OptionalCharacter,
  optionalCharacters,
  EvilOptionalCharacter,
  evilOptionalCharacters,
  isEvilOptionalCharacter,
} from "@/types/schema/OptionalCharacter";

export type Character = "minion" | "knight" | OptionalCharacter;

export const isCharacter = (value: any): value is Character => {
  return value === "minion" || value === "knight" || isOptionalCharacter(value);
};

export const isEvilCharacter = (value: any): value is EvilOptionalCharacter => {
  return isEvilOptionalCharacter(value) || value === "minion";
};

export const characters = ["knight", "minion", ...optionalCharacters] as const;
