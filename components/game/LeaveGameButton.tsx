import { useLeaveGameMutation } from "@/mutations/useLeaveGameMutation";
import { Button, ButtonProps } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

export type LeaveGameButtonProps = {
  id: string;
} & Partial<ButtonProps>;

export const LeaveGameButton = (props: LeaveGameButtonProps) => {
  const { id, ...buttonProps } = props;
  const { mutateAsync, isLoading } = useLeaveGameMutation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleClick = async () => {
    try {
      await mutateAsync({ id });

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
