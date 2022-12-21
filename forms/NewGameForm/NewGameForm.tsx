import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import {
  NewGameFormFields,
  isOptionAvailable,
  useNewGameForm,
} from "./useNewGameForm";
import { ReactNode, useCallback, useEffect } from "react";
import { GameOptions } from "@/schema";

type OptionalPlayer = keyof GameOptions;

type DynamicValue<T> = T | ((values: NewGameFormFields) => T);

type OptionInfo = {
  label: DynamicValue<ReactNode>;
  isDisabled?: DynamicValue<boolean>;
  key: OptionalPlayer;
  helperText?: DynamicValue<ReactNode>;
};

const options: OptionInfo[] = [
  {
    label: "Merlin",
    key: "merlin",
    helperText: (
      <>
        Merlin is a character who knows the identities of the Evil players in
        the game, but must keep this information secret from the Evil players.
        The Good players must try to figure out who the Evil players are and
        eliminate them, while the Evil players try to avoid detection and
        sabotage the Good players' efforts.
      </>
    ),
  },
  {
    label: (values) =>
      values.merlin
        ? "Assassin"
        : "Assassin (only available if merlin is enabled)",
    key: "assassin",
    helperText: (
      <>
        The Assassin is an Evil player who has the ability to try and eliminate
        one player of their choice during the game. The Assassin's goal is to
        eliminate key Good players and help the Evil players win the game.
      </>
    ),
    isDisabled: (values) => !isOptionAvailable(values, "assassin"),
  },
  {
    label: (values) =>
      values.merlin
        ? "Mordred"
        : "Mordred (only available if merlin is enabled)",
    key: "mordred",
    isDisabled: (values) => !isOptionAvailable(values, "mordred"),
    helperText: (
      <>
        Mordred is a character who is an Evil player and is known only to the
        other Evil players. The Merlin is unaware of Mordred's identity.
      </>
    ),
  },
  {
    label: (values) =>
      values.merlin
        ? "Percival"
        : "Percival (only available if merlin is enabled)",
    key: "percival",
    helperText: (
      <>
        Percival is a character who knows the identity of Merlin, but does not
        know which players are Evil. Percival's goal is to deduce the identity
        of Merlin and help the Good players win the game.
      </>
    ),
    isDisabled: (values) => !isOptionAvailable(values, "percival"),
  },
  {
    label: (values) =>
      values.merlin && values.percival
        ? "Morgana"
        : "Morgana (only available if percival is enabled)",
    key: "morgana",
    isDisabled: (values) => !isOptionAvailable(values, "morgana"),
    helperText: (
      <>
        Morgana is also shown but is actually an Evil player. Morgana's goal is
        to deceive Percival and lead the Good players astray.
      </>
    ),
  },
  {
    label: "Oberon",
    key: "oberon",
    helperText: (
      <>
        Oberon is sort of like a wildcard evil character. They have no knowledge
        of the other evil players nor do the other evil players know the oberon.
        The merlin is also unaware of the oberon.
      </>
    ),
  },
];

export const NewGameForm = () => {
  const { values, setFieldValue, setValues, submitForm } = useNewGameForm();

  const getValue = useCallback(
    <T extends any>(value: DynamicValue<T>) => {
      if (value instanceof Function) {
        return value(values) as T;
      }

      return value as T;
    },
    [values]
  );

  return (
    <FormGroup>
      {options.map((option) => {
        const isDisabled = getValue(option.isDisabled);

        return (
          <FormControl key={option.key}>
            <FormControlLabel
              label={getValue(option.label)}
              control={
                <Checkbox
                  checked={!isDisabled && values[option.key]}
                  disabled={isDisabled}
                  onChange={(ev) =>
                    setFieldValue(option.key, ev.currentTarget.checked)
                  }
                />
              }
            />
            <FormHelperText>{getValue(option.helperText)}</FormHelperText>
          </FormControl>
        );
      })}

      <Button onClick={submitForm}>Submit</Button>
    </FormGroup>
  );
};
