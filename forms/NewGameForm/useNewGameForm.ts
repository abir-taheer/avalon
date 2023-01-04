import { GameOptions } from "@/schema";
import { useFormik, FormikConfig, FormikErrors, FormikBag } from "formik";
import { validateGameOptions } from "@/utils/game/validateGameOptions";

export type NewGameFormFields = GameOptions;
export type NewGameFormConfig = FormikConfig<NewGameFormFields>;

const initialValues: NewGameFormFields = {
  merlin: true,
  assassin: true,
  percival: false,
  morgana: false,
  mordred: false,
  oberon: false,
};

export const isOptionAvailable = (
  values: NewGameFormFields,
  option: keyof NewGameFormFields
): boolean => {
  // The following all require merlin to be enabled
  if (option === "assassin" || option === "mordred" || option === "percival") {
    return isOptionAvailable(values, "merlin") && values.merlin;
  }

  // Morgana requires percival to be enabled
  if (option === "morgana") {
    return isOptionAvailable(values, "percival") && values.percival;
  }

  return true;
};

const sanitizeOptions = (values: NewGameFormFields) => {
  const options: GameOptions = { ...values };

  for (let key in options) {
    if (!isOptionAvailable(values, key as keyof NewGameFormFields)) {
      options[key as keyof GameOptions] = false;
    }
  }

  return options;
};

const onSubmit: NewGameFormConfig["onSubmit"] = async (values) => {
  const actualValues = sanitizeOptions(values);

  // const room = await createRoom(actualValues);

  // console.log(room);
};

const validate: NewGameFormConfig["validate"] = validateGameOptions;

type PrefilledConfigValues = "initialValues" | "onSubmit" | "validate";

export type UseNewGameFormProps = Omit<
  NewGameFormConfig,
  PrefilledConfigValues
>;

export const useNewGameForm = (props: UseNewGameFormProps = {}) => {
  const formik = useFormik<NewGameFormFields>({
    initialValues,
    onSubmit,
    validate,
    ...props,
  });

  return formik;
};
