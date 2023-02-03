import { useRemovePlayerFromGameMutation } from "@/mutations/useRemovePlayerFromGameMutation";
import { Button, ButtonProps } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useAuth } from "@/hooks";

export type LeaveGameButtonProps = {
  id: string;
} & Partial<ButtonProps>;

export const LeaveGameButton = (props: LeaveGameButtonProps) => {
  const { id, ...buttonProps } = props;
  const { user } = useAuth();
  const { mutateAsync, isLoading } = useRemovePlayerFromGameMutation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleClick = async () => {
    if (!user) {
      throw new Error("LeaveGameButton clicked but user is not signed in");
    }

    try {
      await mutateAsync({ game: id, user: user.uid });

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
      variant={"contained"}
      onClick={handleClick}
    >
      {isLoading ? "Leaving..." : "Leave Game"}
    </Button>
  );
};
