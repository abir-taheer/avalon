import { ViewOnlyOptionsPreview } from "@/components/game/GameWindow/ViewOnlyOptionsPreview";
import { StartGameButton } from "@/components/game/StartGameButton";
import { useAuth } from "@/hooks";
import { Game } from "@/types/schema";
import { getMinimumNumberOfPlayersRequired } from "@/utils/game/getMinimumNumberOfPlayersRequired";
import { getNumEvilPlayers } from "@/utils/game/getNumEvilPlayers";
import { Button, colors, Stack, Tooltip, Typography } from "@mui/material";
import { useMemo } from "react";
import { LinkOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";
import { useEditGameOptionsDialog } from "@/components/dialog/game/EditGameOptionsDialog";
export type OptionsPreviewProps = {
  game: Game;
};

export const OptionsPreview = ({ game }: OptionsPreviewProps) => {
  const { user } = useAuth();

  const isOwner = user?.uid === game.ownerId;

  const minimumPlayersNeeded = useMemo(
    () => getMinimumNumberOfPlayersRequired(game.options),
    [game.options]
  );

  const { enqueueSnackbar } = useSnackbar();
  const openEditDialog = useEditGameOptionsDialog();

  const { data: owner } = useRealtimeUserQuery({
    id: game.ownerId,
    query: {
      enabled: !isOwner,
    },
  });

  const numEvilPlayers = useMemo(
    () => getNumEvilPlayers(game.options),
    [game.options]
  );

  const numGoodPlayers = useMemo(
    () => Math.max(numEvilPlayers + 1, game.playerIds.length - numEvilPlayers),
    [game.playerIds, numEvilPlayers]
  );

  const hasEnoughPlayers = useMemo(
    () => game.playerIds.length >= minimumPlayersNeeded,
    [game.playerIds.length, minimumPlayersNeeded]
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

  return (
    <Stack spacing={2}>
      {isOwner && (
        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={() => openEditDialog({ game })}
        >
          Update Game Settings
        </Button>
      )}

      <Typography variant={"h4"} align={"center"}>
        <Typography variant={"inherit"} component={"span"} color={"primary"}>
          {numGoodPlayers} Good
        </Typography>{" "}
        v.s.{" "}
        <Typography
          variant={"inherit"}
          component={"span"}
          color={colors.red[500]}
        >
          {numEvilPlayers} Evil
        </Typography>
      </Typography>

      <ViewOnlyOptionsPreview game={game} />

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

      {isOwner && hasEnoughPlayers && <StartGameButton id={game.id} />}
    </Stack>
  );
};
