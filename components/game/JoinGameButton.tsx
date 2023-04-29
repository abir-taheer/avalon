import { useJoinGameMutation } from "@/mutations/useJoinGameMutation";
import { Button, ButtonProps } from "@mui/material";
import { useSnackbar } from "notistack";
import { useAuthRequiredDialog } from "@/components/dialog/auth/AuthRequiredDialog";
import { useAuth } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { useGameContext } from "@/context/GameContext";

export type JoinGameButtonProps = {} & Partial<ButtonProps>;

export const JoinGameButton = (props: JoinGameButtonProps) => {
  const { mutateAsync, isLoading } = useJoinGameMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { isSignedIn } = useAuth();
  const [queuedAttempt, setQueuedAttempt] = useState(false);
  const openAuthDialog = useAuthRequiredDialog();
  const game = useGameContext();

  const join = useCallback(async () => {
    try {
      await mutateAsync({ game: game.id });

      enqueueSnackbar("Joined game", { variant: "success" });
    } catch (e) {
      // TODO handle error
      console.error(e);
    }
  }, [game.id, mutateAsync, enqueueSnackbar]);

  const handleClick = async () => {
    if (!isSignedIn) {
      const auth = await openAuthDialog(undefined);

      if (auth) {
        setQueuedAttempt(true);
      }

      return;
    }

    await join();
  };

  useEffect(() => {
    if (queuedAttempt) {
      join().finally(() => setQueuedAttempt(false));
    }
  }, [queuedAttempt, join]);

  return (
    <Button
      {...props}
      disabled={props.disabled || isLoading}
      variant={"contained"}
      onClick={handleClick}
    >
      {isLoading ? "Joining..." : "Join Game"}
    </Button>
  );
};
