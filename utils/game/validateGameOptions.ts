import { GameOptions } from "@/schema";
import { FormikErrors } from "formik";

export const validateGameOptions = (options: GameOptions) => {
  const errors: FormikErrors<GameOptions> = {};

  if (options.assassin && !options.merlin) {
    errors.merlin = "Assassin cannot be enabled without Merlin";
  }

  if (options.mordred && !options.merlin) {
    errors.mordred = "Mordred cannot be enabled without Merlin";
  }

  if (options.percival && !options.merlin) {
    errors.percival = "Percival cannot be enabled without Merlin";
  }

  if (options.morgana && !options.percival) {
    errors.morgana = "Morgana cannot be enabled without Percival";
  }

  return errors;
};
