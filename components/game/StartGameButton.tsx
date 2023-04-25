import { AdsClick } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

export type StartGameButtonProps = {
  id: string;
};

export const StartGameButton = ({ id }: StartGameButtonProps) => {
  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    setDisabled(true);
    setTimeout(setDisabled, 1000, false);
  };

  return (
    <Button
      variant={"contained"}
      startIcon={<AdsClick />}
      disabled={disabled}
      onClick={handleClick}
    >
      Start Game
    </Button>
  );
};
