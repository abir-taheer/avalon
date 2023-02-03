export type OptionalCharacter =
  | "merlin"
  | "assassin"
  | "percival"
  | "morgana"
  | "mordred"
  | "oberon";

export const optionalCharacters = [
  "merlin",
  "assassin",
  "percival",
  "morgana",
  "mordred",
  "oberon",
] as const;

const optionalCharacterSet = new Set(optionalCharacters);

export const isOptionalCharacter = (value: any): value is OptionalCharacter => {
  return optionalCharacterSet.has(value);
};
