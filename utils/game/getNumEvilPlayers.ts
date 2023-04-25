import { GameOptions } from "@/types/schema";

export const getNumEvilPlayers = (gameOptions: GameOptions) => {
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

  return Math.max(2, evilOptionsEnabled);
};
