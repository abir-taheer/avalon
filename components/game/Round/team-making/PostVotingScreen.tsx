import { PlayerName } from "@/components/auth/PlayerName";
import { useGameContext } from "@/context/GameContext";
import { useDeleteTeamVoteMutation } from "@/mutations/useDeleteTeamVoteMutation";
import { RealTimeUser, Round } from "@/types/schema";
import { Button, colors, Divider, Stack, Typography } from "@mui/material";

export type PostVotingScreenProps = {
  round: Round;
  playerIdsWhoNeedToVote: Array<RealTimeUser["uid"]>;
  approval: boolean;
};
export const PostVotingScreen = ({
  round,
  playerIdsWhoNeedToVote,
  approval,
}: PostVotingScreenProps) => {
  const game = useGameContext();
  const { mutateAsync: deleteVote, isLoading: isDeleting } =
    useDeleteTeamVoteMutation();

  const handleDeleteVote = async () => {
    await deleteVote({ game: game.id, round: round.id });
  };

  return (
    <Stack alignItems={"center"} gap={2}>
      <Typography fontWeight={"bold"}>
        You've voted to{" "}
        <Typography
          color={approval ? colors.green[600] : "error"}
          component={"span"}
          fontWeight={"bolder"}
        >
          {approval ? "approve" : "reject"}
        </Typography>{" "}
        this team
      </Typography>

      <Button
        onClick={handleDeleteVote}
        variant={"outlined"}
        disabled={isDeleting}
      >
        Change Vote
      </Button>

      {playerIdsWhoNeedToVote.length > 0 && (
        <>
          <Divider />

          <Typography
            gutterBottom
            align={"center"}
            variant={"caption"}
            color={"grey"}
          >
            The following players still need to vote:
          </Typography>
          <Stack justifyContent={"center"} direction={"row"} spacing={2}>
            {playerIdsWhoNeedToVote.map((id) => (
              <PlayerName
                key={id}
                playerId={id}
                color={"grey"}
                variant={"caption"}
              />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};
