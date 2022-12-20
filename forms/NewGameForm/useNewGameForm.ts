import { GameOptions } from "@/schema";
import { useFormik, FormikConfig, FormikErrors } from "formik";

export type NewGameFormFields = GameOptions;
export type NewGameFormConfig = FormikConfig<NewGameFormFields>;

const initialValues: NewGameFormFields = {
  percival: false,
  morgana: false,
  mordred: false,
  oberon: false,
  assassin: false,
};

const onSubmit: NewGameFormConfig["onSubmit"] = (values) => {};

const validate: NewGameFormConfig["validate"] = (values) => {
  const errors: FormikErrors<NewGameFormFields> = {};

  if (!values.assassin) {
    if (values.mordred) {
      errors.mordred = "Mordred cannot be enabled if Assassin is disabled.";
    }

    if (values.morgana) {
      errors.morgana = "Morgana cannot be enabled if Assassin is disabled.";
    }

    if (values.assassin) {
      errors.assassin = "Assassin cannot be enabled if Assassin is disabled.";
    }
  }

  return errors;
};

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
