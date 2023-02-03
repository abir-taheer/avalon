import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useNewGameForm } from "./useNewGameForm";
import { optionalCharacters } from "@/types/schema";
import { getMinimumNumberOfPlayersRequired } from "@/utils/game/getMinimumNumberOfPlayersRequired";

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
    <Stack spacing={2}>
      {isSubmitting && <LinearProgress variant={"indeterminate"} />}

      {optionalCharacters.map((character) => {
        const error = errors.optionalCharacters?.[character];
        const hasError = Boolean(error);

        return (
          <FormControl key={character} disabled={disabled}>
            <FormControlLabel
              disabled={disabled}
              label={character}
              control={
                <Checkbox
                  checked={values.optionalCharacters[character]}
                  onChange={(ev) =>
                    setFieldValue(
                      `optionalCharacters.${character}`,
                      ev.currentTarget.checked
                    )
                  }
                />
              }
            />

            <FormHelperText error={hasError}>{error}</FormHelperText>
          </FormControl>
        );
      })}

      <Typography variant={"body2"}>
        At least{" "}
        <Typography
          color={"primary"}
          variant={"inherit"}
          component={"span"}
          fontWeight={"bold"}
        >
          {getMinimumNumberOfPlayersRequired(values)}
        </Typography>{" "}
        players required with these settings
      </Typography>

      <Button
        onClick={submitForm}
        disabled={disabled}
        variant={"outlined"}
        fullWidth
      >
        Submit
      </Button>
    </Stack>
  );
};
