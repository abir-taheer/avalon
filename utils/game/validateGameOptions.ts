import { OptionalCharacter, GameOptions } from "@/types/schema";
import { validateOptionalCharacterOptions } from "@/utils/game/validateOptionalCharacterOptions";
import { FormikErrors } from "formik";

export const optionDependencies: Record<
  OptionalCharacter,
  OptionalCharacter[]
> = {
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

  const characterErrors = validateOptionalCharacterOptions(
    values.optionalCharacters
  );

  if (Object.keys(characterErrors).length > 0) {
    errors.optionalCharacters = characterErrors;
  }

  return errors;
};
