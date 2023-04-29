import { Divider, Stack } from "@mui/material";
import { JoinGameButton } from "@/components/game/JoinGameButton";
import { GameStatus } from "@/types/schema";
import { useAuth } from "@/hooks";
import { useEffect, useMemo } from "react";
import { PersonAddOutlined } from "@mui/icons-material";
import { OptionsPreview } from "@/components/game/GameWindow/OptionsPreview";
import { usePrevious } from "@/hooks/general/usePrevious";
import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { Gameplay } from "@/components/game/GameWindow/Gameplay";
import { useRoundsQuery } from "@/queries/useRoundsQuery";
import { useGameContext } from "@/context/GameContext";

export type GameWindowProps = {};

export const GameWindow = ({}: GameWindowProps) => {
  const { user } = useAuth();
  const game = useGameContext();
  const previousStatus = usePrevious(game.status);
  const openRoleDialog = useRoleDialog();

  const { data: rounds } = useRoundsQuery({ game: game.id });

  useEffect(() => {
    if (
      previousStatus === GameStatus.waiting &&
      game.status === GameStatus.started
    ) {
      openRoleDialog({ game });
    }
  }, [openRoleDialog, game, previousStatus]);

  const playerInGame = useMemo(
    () => game && user && game.playerIds.includes(user.uid),
    [game, user]
  );

  console.log(game, playerInGame, rounds);

  return (
    <Stack spacing={2}>
      {game.status === GameStatus.waiting && <OptionsPreview game={game} />}

      {game.status === GameStatus.started && playerInGame && rounds && (
        <Gameplay rounds={rounds} />
      )}

      {game.status === GameStatus.waiting && !playerInGame && (
        <>
          <Divider />

          <JoinGameButton startIcon={<PersonAddOutlined />} />
        </>
      )}
    </Stack>
  );
};
