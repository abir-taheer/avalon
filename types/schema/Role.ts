import { Character } from "@/types/schema/Character";

export type CompactRole = {
  playerId: string;
  role: Character;
};

export type Role = {
  playerId: string;
  role: Character;

  context: RoleContext;
};

export type RoleContext = {
  evilRoles: CompactRole[];
  merlinRoles: CompactRole[];
};
