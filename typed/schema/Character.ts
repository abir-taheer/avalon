export type Character =
  | "merlin"
  | "assassin"
  | "percival"
  | "morgana"
  | "mordred"
  | "oberon";

export const characters = [
  "merlin",
  "assassin",
  "percival",
  "morgana",
  "mordred",
  "oberon",
] as const;

export const isCharacter = (value: any): value is Character => {
  return characters.includes(value);
};
