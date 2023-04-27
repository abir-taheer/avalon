import { Round } from "@/types/schema";
import { Button, ButtonProps } from "@mui/material";
import { useSubmitTeamMutation } from "@/mutations/useSubmitTeamMutation";
import { useMemo } from "react";

export type SubmitTeamButtonProps = {
  round: Round;
} & Omit<ButtonProps, "onClick" | "children">;
export const SubmitTeamButton = ({
  round,
  ...buttonProps
}: SubmitTeamButtonProps) => {
  const { mutateAsync, isLoading } = useSubmitTeamMutation();

  const handleClick = async () => {
    await mutateAsync({ game: round.gameId, round: round.id });
  };

  const canSubmit = useMemo(
    () => round.teamSize === round.teamPlayerIds.length,
    [round]
  );

  return (
    <Button
      variant={buttonProps.variant ?? "contained"}
      color={buttonProps.color ?? "secondary"}
      disabled={buttonProps.disabled || isLoading || !canSubmit}
      onClick={handleClick}
    >
      Submit Team
    </Button>
  );
};
