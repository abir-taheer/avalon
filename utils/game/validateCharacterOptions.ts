import { CharacterOptions } from "@/schema";
import { FormikErrors } from "formik";
import { characters } from "@/forms/NewGameForm/useNewGameForm";
import { optionDependencies } from "@/utils/game/validateGameOptions";

export const validateCharacterOptions = (options: CharacterOptions) => {
  const errors: FormikErrors<CharacterOptions> = {};

  const charactersToCheck = characters.filter((char) => options[char]);

  charactersToCheck.forEach((opt) => {
    const failingDependency = optionDependencies[opt].find(
      (dep) => !options[dep]
    );

    if (failingDependency) {
      errors[opt] = `requires ${failingDependency} to be enabled`;
    }
  });

  return errors;
};
