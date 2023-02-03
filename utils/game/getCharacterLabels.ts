import { OptionalCharacter } from "@/types/schema";

export const getCharacterLabels = (character: OptionalCharacter): string[] => {
  switch (character) {
    case "merlin":
      return [
        "Is a good guy",
        "Knows identity of evil players",
        "If the good players win, the evil players have a chance to take back the win by guessing merlin's identity",
      ];

    case "mordred":
      return ["Mordred"];

    case "oberon":
      return ["Oberon"];

    case "percival":
      return ["Percival"];

    case "assassin":
      return ["Assassin"];

    case "morgana":
      return ["Morgana"];
  }

  return [];
};
