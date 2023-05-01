import { useGameContext } from "@/context/GameContext";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useId, useState } from "react";
import { RealTimeUser } from "@/types/schema";
import { PlayerName } from "@/components/auth/PlayerName";
import { useGuessMerlinMutation } from "@/mutations/useGuessMerlinMutation";

export const AssassinView = () => {
  const game = useGameContext();
  const [value, setValue] = useState<RealTimeUser["uid"] | null>(null);
  const id = useId();

  const { mutateAsync, isLoading } = useGuessMerlinMutation();

  const handleClick = async () => {
    if (value) {
      await mutateAsync({ game: game.id, merlin: value });
    }
  };

  return (
    <Stack gap={2}>
      <FormControl>
        <FormLabel id={id}>Who do you think the assassin is?</FormLabel>
        <RadioGroup
          aria-labelledby={id}
          name="merlin-guess"
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value as RealTimeUser["uid"]);
          }}
        >
          {game.playerIds.map((id) => (
            <FormControlLabel
              key={id}
              value={id}
              control={<Radio />}
              label={
                <PlayerName playerId={id} fontSize={16} color={"secondary"} />
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button
        variant={"contained"}
        disabled={!value || isLoading}
        onClick={handleClick}
      >
        Submit
      </Button>
    </Stack>
  );
};
