import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { GameOver } from "@/components/game/GameWindow/GameOver";
import { Gameplay } from "@/components/game/GameWindow/Gameplay";
import { OptionsPreview } from "@/components/game/GameWindow/OptionsPreview";
import { PendingAssassinPreview } from "@/components/game/GameWindow/PendingAssassinPreview";
import { JoinGameButton } from "@/components/game/JoinGameButton";
import { useGameContext } from "@/context/GameContext";
import { useAuth } from "@/hooks";
import { usePrevious } from "@/hooks/general/usePrevious";
import { GameStatus } from "@/types/schema";
import { PersonAddOutlined } from "@mui/icons-material";
import { Divider, Stack } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSetAtom } from "jotai";
import { roundLeaderIdAtom } from "@/atoms/roundLeaderIdAtom";

export type GameWindowProps = {};

export const GameWindow = ({}: GameWindowProps) => {
  const { user } = useAuth();
  const game = useGameContext();
  const previousStatus = usePrevious(game.status);
  const openRoleDialog = useRoleDialog();
  const setRoundLeaderAtom = useSetAtom(roundLeaderIdAtom);

  useEffect(() => {
    if (game.status !== GameStatus.started) {
      setRoundLeaderAtom(null);
    }
  }, [game.status, setRoundLeaderAtom]);

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

      {game.status === GameStatus.started && playerInGame && <Gameplay />}

      {game.status === GameStatus.waiting && !playerInGame && (
        <>
          <Divider />

          <JoinGameButton startIcon={<PersonAddOutlined />} />
        </>
      )}

      {game.status === GameStatus.pending_assassin && (
        <PendingAssassinPreview />
      )}

      {game.status === GameStatus.completed && <GameOver />}
    </Stack>
  );
};
