export type OptionalCharacter =
  | "merlin"
  | "assassin"
  | "percival"
  | "morgana"
  | "mordred"
  | "oberon";

export type EvilOptionalCharacter =
  | "assassin"
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

export const evilOptionalCharacters = [
  "assassin",
  "morgana",
  "mordred",
  "oberon",
];

const optionalCharacterSet = new Set(optionalCharacters);
const evilOptionalCharacterSet = new Set(evilOptionalCharacters);

export const isOptionalCharacter = (value: any): value is OptionalCharacter => {
  return optionalCharacterSet.has(value);
};

export const isEvilOptionalCharacter = (
  value: any
): value is EvilOptionalCharacter => {
  return evilOptionalCharacterSet.has(value);
};
