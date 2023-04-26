import { Character, isEvilCharacter } from "@/types/schema";
import { CompactRole } from "@/types/schema/Role";

export const generatePlayerContext = (
  character: Character,
  roles: CompactRole[]
) => {
  let evilRoles: CompactRole[] = [];
  let merlinRoles: CompactRole[] = [];

  if (character !== "oberon" && isEvilCharacter(character)) {
    evilRoles = roles
      .filter((row) => row.role !== "oberon" && isEvilCharacter(row.role))
      .map((row) => ({ ...row, role: "minion" }));
  }

  if (character === "merlin") {
    // Merlin sees all evil roles except Mordred
    evilRoles = roles
      .filter((row) => row.role !== "mordred" && isEvilCharacter(row.role))
      .map((row) => ({ ...row, role: "minion" }));
  }

  if (character === "percival") {
    merlinRoles = roles
      .filter((row) => row.role === "merlin" || row.role === "morgana")
      .map((row) => ({ ...row, role: "merlin" }));
  }

  return {
    evilRoles,
    merlinRoles,
  };
};
