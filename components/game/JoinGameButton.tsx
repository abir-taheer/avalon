import { useJoinGameMutation } from "@/mutations/useJoinGameMutation";
import { Button, ButtonProps } from "@mui/material";
import { useSnackbar } from "notistack";
import { useAuthRequiredDialog } from "@/components/dialog/auth/useAuthRequiredDialog";
import { useAuth } from "@/hooks";

export type JoinGameButtonProps = {
  id: string;
} & Partial<ButtonProps>;

export const JoinGameButton = (props: JoinGameButtonProps) => {
  const { id, ...buttonProps } = props;
  const { mutateAsync, isLoading } = useJoinGameMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { isSignedIn } = useAuth();
  const openAuthDialog = useAuthRequiredDialog();

  const handleClick = async () => {
    if (!isSignedIn) {
      await openAuthDialog(undefined);
      return;
    }

    try {
      await mutateAsync({ id });

      enqueueSnackbar("Joined game", { variant: "success" });
    } catch (e) {
      // TODO handle error
      console.error(e);
    }
  };

  return (
    <Button
      {...buttonProps}
      disabled={props.disabled || isLoading}
      variant={"contained"}
      onClick={handleClick}
    >
      {isLoading ? "Joining..." : "Join Game"}
    </Button>
  );
};
