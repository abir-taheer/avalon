import { characters, useNewGameForm } from "./useNewGameForm";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  LinearProgress,
} from "@mui/material";

type FormType = ReturnType<typeof useNewGameForm>;

type NewGameFormProps = {
  form: FormType;
  disabled?: boolean;
};

export const NewGameForm = (props: NewGameFormProps) => {
  const { errors, values, setFieldValue, submitForm, isSubmitting } =
    props.form;

  const disabled = props.disabled || isSubmitting;

  return (
    <FormGroup>
      {characters.map((character) => (
        <FormControl key={character} disabled={disabled}>
          <FormControlLabel
            disabled={disabled}
            label={character}
            control={
              <Checkbox
                checked={values.characters[character]}
                onChange={(ev) =>
                  setFieldValue(
                    `characters.${character}`,
                    ev.currentTarget.checked
                  )
                }
              />
            }
          />
          <FormHelperText error>
            {errors.characters?.[character]}
          </FormHelperText>
        </FormControl>
      ))}

      {isSubmitting && <LinearProgress variant={"indeterminate"} />}

      <Button onClick={submitForm} disabled={disabled}>
        Submit
      </Button>
    </FormGroup>
  );
};
