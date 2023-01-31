import { Character, GameOptions } from "@/types/schema";
import { validateCharacterOptions } from "@/utils/game/validateCharacterOptions";
import { FormikErrors } from "formik";

export const optionDependencies: Record<Character, Character[]> = {
  // Merlin and oberon are always available
  merlin: [],
  oberon: [],

  // Assassin is only available if merlin is enabled
  assassin: ["merlin"],
  mordred: ["merlin"],
  percival: ["merlin"],

  // Morgana is only available if percival is enabled
  morgana: ["percival"],
};

export const validateGameOptions = (values: GameOptions) => {
  const errors: FormikErrors<GameOptions> = {};

  const characterErrors = validateCharacterOptions(values.characters);

  if (Object.keys(characterErrors).length > 0) {
    errors.characters = characterErrors;
  }

  return errors;
};
