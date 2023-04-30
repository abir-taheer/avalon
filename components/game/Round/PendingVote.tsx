import { Round } from "@/types/schema";
import { Button, Stack, Typography } from "@mui/material";
import { useTeamVoteMutation } from "@/mutations/useTeamVoteMutation";
import { useGameContext } from "@/context/GameContext";

export type PendingVoteProps = {
  round: Round;
  isLastPersonToVote: boolean;
};

export const PendingVote = ({
  round,
  isLastPersonToVote,
}: PendingVoteProps) => {
  const game = useGameContext();
  const { mutateAsync: vote, isLoading } = useTeamVoteMutation();

  const handleVote = (approval: boolean) => {
    vote({ game: game.id, round: round.id, approval });
  };

  return (
    <Stack gap={4}>
      <Stack direction={"row"} gap={4} justifyContent={"center"}>
        <Button
          color={"success"}
          disabled={isLoading}
          onClick={() => handleVote(true)}
          variant={"outlined"}
        >
          Approve
        </Button>
        <Button
          color={"error"}
          disabled={isLoading}
          onClick={() => handleVote(false)}
          variant={"outlined"}
        >
          Reject
        </Button>
      </Stack>

      {isLastPersonToVote && (
        <Typography align={"center"} color={"error"} fontWeight={"bold"}>
          Head's up, you're the only one who hasn't voted yet!
        </Typography>
      )}
    </Stack>
  );
};
