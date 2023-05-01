import { ViewOnlyOptionsPreview } from "@/components/game/GameWindow/ViewOnlyOptionsPreview";
import { StartGameButton } from "@/components/game/StartGameButton";
import { useAuth } from "@/hooks";
import { Game } from "@/types/schema";
import { getMinimumNumberOfPlayersRequired } from "@/utils/game/getMinimumNumberOfPlayersRequired";
import { getNumEvilPlayers } from "@/utils/game/getNumEvilPlayers";
import { colors, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
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

  return (
    <Stack spacing={2}>
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

      {isOwner && hasEnoughPlayers && <StartGameButton id={game.id} />}
    </Stack>
  );
};
