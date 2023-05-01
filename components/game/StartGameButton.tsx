import { useStartGameMutation } from "@/mutations/useStartGameMutation";
import { AdsClick } from "@mui/icons-material";
import { Button } from "@mui/material";

export type StartGameButtonProps = {
  id: string;
  disabled?: boolean;
};

export const StartGameButton = ({ id, disabled }: StartGameButtonProps) => {
  const { mutateAsync, isLoading } = useStartGameMutation();

  const handleClick = async () => {
    const data = await mutateAsync({ game: id });
  };

  return (
    <Button
      variant={"contained"}
      startIcon={<AdsClick />}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      Start Game
    </Button>
  );
};
