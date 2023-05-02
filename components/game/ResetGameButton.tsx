import { RestartAlt } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { useResetGameMutation } from "@/mutations/useResetGameMutation";
import { useSimpleConfirmDialog } from "@/components/dialog/ui/SimpleConfirmDialog";

export type ResetGameButtonProps = {
  id: string;
  disabled?: boolean;
} & Omit<ButtonProps, "id" | "disabled" | "startIcon">;

export const ResetGameButton = ({
  id,
  disabled,
  ...buttonProps
}: ResetGameButtonProps) => {
  const { mutateAsync, isLoading } = useResetGameMutation();
  const openConfirm = useSimpleConfirmDialog();

  const handleClick = async () => {
    const confirmation = await openConfirm({
      title: "Confirm Reset",
      message: "Are you sure you want to reset this game?",
    });

    if (confirmation) {
      await mutateAsync({ game: id });
    }
  };

  return (
    <Button
      variant={"outlined"}
      {...buttonProps}
      startIcon={<RestartAlt />}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      Reset Game
    </Button>
  );
};
