import { Divider, Stack } from "@mui/material";
import { LeaveGameButton } from "@/components/game/LeaveGameButton";
import { JoinGameButton } from "@/components/game/JoinGameButton";
import { Game, GameStatus } from "@/types/schema";
import { useAuth } from "@/hooks";
import { useEffect, useMemo } from "react";
import { PersonAddOutlined } from "@mui/icons-material";
import { OptionsPreview } from "@/components/game/GameWindow/OptionsPreview";
import { usePrevious } from "@/hooks/general/usePrevious";
import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { Gameplay } from "@/components/game/GameWindow/Gameplay";

export type GameWindowProps = {
  game: Game;
};

export const GameWindow = ({ game }: GameWindowProps) => {
  const { user } = useAuth();
  const previousStatus = usePrevious(game.status);
  const openRoleDialog = useRoleDialog();

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

  return (
    <Stack spacing={2}>
      {game.status === GameStatus.waiting && <OptionsPreview game={game} />}

      {game.status === GameStatus.started && playerInGame && (
        <Gameplay game={game} />
      )}

      {game.status === GameStatus.waiting && !playerInGame && (
        <>
          <Divider />

          <JoinGameButton id={game.id} startIcon={<PersonAddOutlined />} />
        </>
      )}
    </Stack>
  );
};
