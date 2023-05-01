import { CharacterAvatar } from "@/components/avatar/CharacterAvatar";
import { useAuth } from "@/hooks";
import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";
import { Game, optionalCharacters } from "@/types/schema";
import { getMinimumNumberOfPlayersRequired } from "@/utils/game/getMinimumNumberOfPlayersRequired";
import {
  Button,
  capitalize,
  colors,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { LinkOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

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

  const gameLink = `${window.location.origin}/game/${game.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      enqueueSnackbar("Copied to clipboard", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Failed to copy to clipboard", { variant: "error" });
    }
  };

  const hasEnoughPlayers = useMemo(
    () => game.playerIds.length >= minimumPlayersNeeded,
    [game.playerIds.length, minimumPlayersNeeded]
  );

  return (
    <Stack gap={2}>
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

      <Tooltip title={gameLink}>
        <Button
          startIcon={<LinkOutlined />}
          variant={"outlined"}
          color={"secondary"}
          onClick={handleCopy}
        >
          Copy Game Link
        </Button>
      </Tooltip>
    </Stack>
  );
};
