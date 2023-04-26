import { Divider, Stack } from "@mui/material";
import { LeaveGameButton } from "@/components/game/LeaveGameButton";
import { JoinGameButton } from "@/components/game/JoinGameButton";
import { Game, GameStatus } from "@/types/schema";
import { useAuth } from "@/hooks";
import { useEffect, useMemo } from "react";
import { CancelOutlined, PersonAddOutlined } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";
import { OptionsPreview } from "@/components/game/GameWindow/OptionsPreview";
import { usePrevious } from "@/hooks/general/usePrevious";
import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { Gameplay } from "@/components/game/GameWindow/Gameplay";

export type GameWindowProps = {
  game: Game;
};

const useStyles = makeStyles()({
  LeaveGameButton: {
    filter: "grayscale(100%)",
    ":hover": {
      filter: "unset",
    },
  },
});

export const GameWindow = ({ game }: GameWindowProps) => {
  const { user } = useAuth();
  const { classes } = useStyles();
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

      <Divider />

      {game.status === GameStatus.waiting && playerInGame && (
        <LeaveGameButton
          id={game.id}
          className={classes.LeaveGameButton}
          startIcon={<CancelOutlined />}
          color={"error"}
        />
      )}

      {game.status === GameStatus.waiting && !playerInGame && (
        <JoinGameButton id={game.id} startIcon={<PersonAddOutlined />} />
      )}
    </Stack>
  );
};
