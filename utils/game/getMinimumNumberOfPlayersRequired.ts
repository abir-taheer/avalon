import { GameOptions } from "@/types/schema";

export const getMinimumNumberOfPlayersRequired = (
  gameOptions: GameOptions
): number => {
  const { optionalCharacters } = gameOptions;
  const { oberon, assassin, mordred, morgana } = optionalCharacters;

  let evilOptionsEnabled = 0;

  if (assassin) {
    evilOptionsEnabled += 1;
  }

  if (morgana) {
    evilOptionsEnabled += 1;
  }

  if (mordred) {
    evilOptionsEnabled += 1;
  }

  if (oberon) {
    evilOptionsEnabled += 1;
  }

  const numEvilPlayers = Math.max(2, evilOptionsEnabled);
  const numGoodPlayers = numEvilPlayers + 1;

  return numGoodPlayers + numEvilPlayers;
};
