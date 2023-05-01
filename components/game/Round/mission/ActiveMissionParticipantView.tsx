import { useSimpleConfirmDialog } from "@/components/dialog/ui/SimpleConfirmDialog";
import { useDecideMissionOutcomeMutation } from "@/mutations/useDecideMissionOutcomeMutation";
import { Round } from "@/types/schema";
import { Button, colors, Stack, Typography } from "@mui/material";

export type ActiveMissionParticipantViewProps = {
  round: Round;
};

export const ActiveMissionParticipantView = ({
  round,
}: ActiveMissionParticipantViewProps) => {
  const confirm = useSimpleConfirmDialog();

  const { mutateAsync, isLoading } = useDecideMissionOutcomeMutation();

  const handleClick = async (success: boolean) => {
    const confirmation = await confirm({
      title: "Confirm",
      message: (
        <Typography fontSize={12}>
          Are you sure you want to{" "}
          <Typography
            component={"span"}
            variant={"inherit"}
            color={success ? colors.green[600] : "error"}
          >
            {success ? "pass" : "fail"}
          </Typography>{" "}
          this mission? You will not be able to undo this action.
        </Typography>
      ),
    });

    if (!confirmation) {
      return;
    }

    await mutateAsync({
      round: round.id,
      game: round.gameId,
      passed: success,
    });
  };

  return (
    <Stack gap={2}>
      <Typography>Decide the mission outcome</Typography>

      <Stack direction={"row"} gap={4} alignItems={"center"}>
        <Button
          color={"error"}
          variant={"outlined"}
          fullWidth
          disabled={isLoading}
          onClick={() => handleClick(false)}
        >
          Fail
        </Button>

        <Button
          color={"primary"}
          variant={"outlined"}
          fullWidth
          disabled={isLoading}
          onClick={() => handleClick(true)}
        >
          Pass
        </Button>
      </Stack>
    </Stack>
  );
};
