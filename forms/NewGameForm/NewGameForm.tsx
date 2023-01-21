import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { characters, useNewGameForm } from "./useNewGameForm";

type FormType = ReturnType<typeof useNewGameForm>;

type NewGameFormProps = {
  form: FormType;
};

export const NewGameForm = (props: NewGameFormProps) => {
  const { errors, values, setFieldValue, submitForm } = props.form;

  return (
    <FormGroup>
      {characters.map((character) => (
        <FormControl key={character}>
          <FormControlLabel
            label={character}
            control={
              <Checkbox
                checked={values.characters[character]}
                onChange={(ev) =>
                  setFieldValue(character, ev.currentTarget.checked)
                }
              />
            }
          />
          <FormHelperText error>
            {errors.characters?.[character]}
          </FormHelperText>
        </FormControl>
      ))}

      <Button onClick={submitForm}>Submit</Button>
    </FormGroup>
  );
};
