import { PlayerName } from "@/components/auth/PlayerName";
import { PendingVote } from "@/components/game/Round/team-making/PendingVote";
import { PostVotingScreen } from "@/components/game/Round/team-making/PostVotingScreen";
import { useGameContext } from "@/context/GameContext";
import { useAuth } from "@/hooks";
import { useCurrentVoteQuery } from "@/queries/useCurrentVoteQuery";
import { Round } from "@/types/schema";
import { Card, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

export type TeamVoteProps = {
  round: Round;
};
export const TeamVote = ({ round }: TeamVoteProps) => {
  const game = useGameContext();
  const { data: currentVote } = useCurrentVoteQuery({
    game: game.id,
    round: round.id,
  });

  const { user } = useAuth();

  const approval = currentVote?.approval ?? false;

  const peopleWhoNeedToVote = useMemo(
    () =>
      game.playerIds.filter(
        (id) => !round.votedPlayerIds.includes(id) && id !== user!.uid
      ),
    [game, round, user]
  );

  return (
    <Stack gap={4}>
      <Typography align={"center"}>
        <PlayerName playerId={round.leaderId} /> proposed the following team
      </Typography>

      <Stack direction={"row"} justifyContent={"center"} gap={2}>
        {round.teamPlayerIds.map((playerId) => (
          <PlayerName key={playerId} playerId={playerId} color={"secondary"} />
        ))}
      </Stack>

      <Card sx={{ padding: 2 }} elevation={4}>
        {!currentVote ? (
          <PendingVote
            round={round}
            isLastPersonToVote={peopleWhoNeedToVote.length === 0}
          />
        ) : (
          <PostVotingScreen
            round={round}
            playerIdsWhoNeedToVote={peopleWhoNeedToVote}
            approval={approval}
          />
        )}
      </Card>
    </Stack>
  );
};
