import { Character, GameOptions } from "@/schema";
import { validateGameOptions } from "@/utils/game/validateGameOptions";
import { useFormik, FormikConfig } from "formik";

export type NewGameFormConfig = FormikConfig<GameOptions>;

export const characters: Character[] = [
  "merlin",
  "assassin",
  "percival",
  "morgana",
  "mordred",
  "oberon",
];

const initialValues: GameOptions = {
  characters: {
    merlin: true,
    assassin: true,
    percival: false,
    morgana: false,
    mordred: false,
    oberon: false,
  },
};

const validate: NewGameFormConfig["validate"] = validateGameOptions;

type PrefilledConfigValues = "validate" | "initialValues";

export type UseNewGameFormProps = Omit<
  NewGameFormConfig,
  PrefilledConfigValues
> & {
  initialValues?: GameOptions;
};

export const useNewGameForm = (props: UseNewGameFormProps) => {
  const formik = useFormik<GameOptions>({
    initialValues: props.initialValues ?? initialValues,
    validate,
    ...props,
  });

  return formik;
};
