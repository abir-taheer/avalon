import { GameOptions } from "@/types/schema";
import { getNumEvilPlayers } from "@/utils/game/getNumEvilPlayers";

export const getMinimumNumberOfPlayersRequired = (
  gameOptions: GameOptions
): number => {
  const numEvilPlayers = getNumEvilPlayers(gameOptions);
  const numGoodPlayers = numEvilPlayers + 1;

  return numGoodPlayers + numEvilPlayers;
};
