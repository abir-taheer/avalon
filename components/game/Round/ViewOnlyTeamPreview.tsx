import { PlayerName } from "@/components/auth/PlayerName";
import { Game, Round } from "@/types/schema";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

export type ViewOnlyTeamProps = {
  game: Game;
  round: Round;
};

export const ViewOnlyTeamPreview = ({ round, game }: ViewOnlyTeamProps) => {
  const selectedPlayers = useMemo(() => new Set(round.teamPlayerIds), [round]);

  return (
    <Stack>
      <Typography align={"center"}>
        <PlayerName playerId={round.leaderId} color={"secondary"} /> is making
        the team
      </Typography>

      <Typography>
        The following people have been selected for the current team
      </Typography>

      <FormGroup>
        {game.playerIds.map((playerId) => (
          <FormControlLabel
            key={playerId}
            control={
              <Checkbox
                key={playerId}
                checked={selectedPlayers.has(playerId)}
                disabled
              />
            }
            label={<PlayerName playerId={playerId} />}
          />
        ))}
      </FormGroup>
    </Stack>
  );
};

/*

/games/{gameId}/rounds/{roundId}
TODO update firebase access control rules so that:
user can write to only the teamPlayerIds field if
* Their user id matches the value of the currentLeaderId field
* the size of the array that they're trying to write is equal to or less than the value of the teamSize field
* the status of the round is "team_selection"
 */
