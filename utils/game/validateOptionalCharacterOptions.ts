import { OptionalCharacterOptions, optionalCharacters } from "@/types/schema";
import { optionDependencies } from "@/utils/game/validateGameOptions";
import { FormikErrors } from "formik";

export const validateOptionalCharacterOptions = (
  options: OptionalCharacterOptions
) => {
  const errors: FormikErrors<OptionalCharacterOptions> = {};

  const charactersToCheck = optionalCharacters.filter((char) => options[char]);

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
