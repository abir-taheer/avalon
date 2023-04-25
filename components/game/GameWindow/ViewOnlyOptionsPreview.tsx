import { Game, optionalCharacters } from "@/types/schema";
import {
  capitalize,
  colors,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { CharacterAvatar } from "@/components/avatar/CharacterAvatar";
import { useMemo } from "react";
import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";
import { getMinimumNumberOfPlayersRequired } from "@/utils/game/getMinimumNumberOfPlayersRequired";
import { useAuth } from "@/hooks";

export type ViewOnlyOptionsPreviewProps = {
  game: Game;
};

export const ViewOnlyOptionsPreview = ({
  game,
}: ViewOnlyOptionsPreviewProps) => {
  // Sort it so that the characters that are enabled show up at the top
  const characters = useMemo(
    () =>
      Array.from(optionalCharacters).sort(
        (a, b) =>
          // True evaluates to 1 and false evaluates to 0
          Number(game.options.optionalCharacters[b]) -
          Number(game.options.optionalCharacters[a])
      ),
    [game.options.optionalCharacters]
  );
  const { user } = useAuth();

  const isOwner = user?.uid === game.ownerId;

  const { data: owner } = useRealtimeUserQuery({
    id: game.ownerId,
    query: {
      enabled: !isOwner,
    },
  });

  const minimumPlayersNeeded = useMemo(
    () => getMinimumNumberOfPlayersRequired(game.options),
    [game.options]
  );

  const hasEnoughPlayers = useMemo(
    () => game.playerIds.length >= minimumPlayersNeeded,
    [game.playerIds.length, minimumPlayersNeeded]
  );

  return (
    <Stack>
      <List dense>
        {characters.map((character) => {
          const isEnabled = game.options.optionalCharacters[character];
          const subtitleColor = isEnabled ? colors.green[500] : colors.red[500];

          return (
            <ListItem
              alignItems="flex-start"
              key={character}
              disabled={!isEnabled}
            >
              <ListItemAvatar>
                <CharacterAvatar character={character} width={50} height={50} />
              </ListItemAvatar>
              <ListItemText
                primary={capitalize(character)}
                secondary={
                  <Typography color={subtitleColor} variant={"body2"}>
                    {isEnabled ? "Enabled" : "Disabled"}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>

      <Typography variant={"subtitle2"} align={"center"}>
        {hasEnoughPlayers ? (
          `Waiting for ${
            isOwner ? "you" : owner?.displayName ?? "..."
          } to start the game`
        ) : (
          <Typography variant={"inherit"} component={"span"}>
            Need{" "}
            <Typography
              variant={"inherit"}
              component={"span"}
              color={"primary"}
            >
              {minimumPlayersNeeded}
            </Typography>{" "}
            players to start. Waiting for more players to join...
          </Typography>
        )}
      </Typography>
    </Stack>
  );
};
