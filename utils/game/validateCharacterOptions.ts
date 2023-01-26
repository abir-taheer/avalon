import { characters } from "@/forms/NewGameForm/useNewGameForm";
import { CharacterOptions } from "@/schema";
import { optionDependencies } from "@/utils/game/validateGameOptions";
import { FormikErrors } from "formik";

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
