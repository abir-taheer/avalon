import { GameOptions, Character, CharacterOptions } from "@/schema";
import { FormikErrors } from "formik";
import { characters } from "@/forms/NewGameForm/useNewGameForm";
import { validateCharacterOptions } from "@/utils/game/validateCharacterOptions";

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

  errors.characters = validateCharacterOptions(values.characters);

  return errors;
};
