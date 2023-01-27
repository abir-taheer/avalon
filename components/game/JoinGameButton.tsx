import { useJoinGameMutation } from "@/mutations/useJoinGameMutation";
import { Button, ButtonProps } from "@mui/material";
import { useSnackbar } from "notistack";

export type JoinGameButtonProps = {
  id: string;
} & Partial<ButtonProps>;

export const JoinGameButton = (props: JoinGameButtonProps) => {
  const { id, ...buttonProps } = props;
  const { mutateAsync, isLoading } = useJoinGameMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async () => {
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
