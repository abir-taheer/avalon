import { useRemovePlayerFromGameMutation } from "@/mutations/useRemovePlayerFromGameMutation";
import { Button, ButtonProps } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useAuth } from "@/hooks";
import { useSimpleConfirmDialog } from "@/components/dialog/ui/SimpleConfirmDialog";
import { useGameContext } from "@/context/GameContext";

export type LeaveGameButtonProps = Partial<ButtonProps>;

export const LeaveGameButton = (props: LeaveGameButtonProps) => {
  const { ...buttonProps } = props;
  const game = useGameContext();
  const { user } = useAuth();
  const { mutateAsync, isLoading } = useRemovePlayerFromGameMutation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const openConfirmationDialog = useSimpleConfirmDialog();

  const handleClick = async () => {
    if (!user) {
      throw new Error("LeaveGameButton clicked but user is not signed in");
    }

    const confirmation = await openConfirmationDialog({
      message: "Are you sure you want to leave this game?",
      title: "Confirm Action",
    });

    if (!confirmation) {
      return;
    }

    try {
      await mutateAsync({ game: game.id, user: user.uid });

      await router.push("/");

      enqueueSnackbar("Left game", { variant: "success" });
    } catch (e) {
      // TODO handle error
      console.error(e);
    }
  };

  return (
    <Button
      {...buttonProps}
      disabled={props.disabled || isLoading}
      variant={"outlined"}
      onClick={handleClick}
    >
      {isLoading ? "Leaving..." : "Leave Game"}
    </Button>
  );
};
