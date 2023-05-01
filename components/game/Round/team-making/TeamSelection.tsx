import { PlayerName } from "@/components/auth/PlayerName";
import { SubmitTeamButton } from "@/components/game/Round/team-making/SubmitTeamButton";
import { useUpdateTeamMutation } from "@/mutations/useUpdateTeamMutation";
import { Game, Round } from "@/types/schema";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

export type TeamSelectionProps = {
  game: Game;
  round: Round;
};
export const TeamSelection = ({ game, round }: TeamSelectionProps) => {
  const { mutateAsync, isLoading } = useUpdateTeamMutation();
  const selectedPlayers = useMemo(() => new Set(round.teamPlayerIds), [round]);

  const handlePlayerToggle = async (playerId: string) => {
    let newTeamPlayerIds = [...round.teamPlayerIds];

    if (selectedPlayers.has(playerId)) {
      newTeamPlayerIds = newTeamPlayerIds.filter((id) => id !== playerId);
    } else {
      newTeamPlayerIds.push(playerId);
    }

    await mutateAsync({
      game: game.id,
      round: round.id,
      team: newTeamPlayerIds,
    });
  };

  return (
    <Stack gap={2}>
      <Typography variant={"body2"}>
        Select {round.teamSize} players for the mission
      </Typography>

      <FormGroup>
        {game.playerIds.map((playerId) => (
          <FormControlLabel
            key={playerId}
            control={
              <Checkbox
                key={playerId}
                checked={selectedPlayers.has(playerId)}
                onClick={() => handlePlayerToggle(playerId)}
                disabled={
                  isLoading ||
                  (round.teamPlayerIds.length >= round.teamSize &&
                    !selectedPlayers.has(playerId))
                }
              />
            }
            label={<PlayerName playerId={playerId} />}
          />
        ))}
      </FormGroup>

      {isLoading && <LinearProgress />}

      <SubmitTeamButton round={round} />
    </Stack>
  );
};
