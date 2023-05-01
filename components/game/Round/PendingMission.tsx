import { Round } from "@/types/schema";
import { useGameContext } from "@/context/GameContext";
import { Card, Divider, Stack } from "@mui/material";
import { useAuth } from "@/hooks";
import { useMemo } from "react";
import { ActiveMissionParticipantView } from "@/components/game/Round/ActiveMissionParticipantView";
import { PassiveMissionParticipant } from "@/components/game/Round/PassiveMissionParticipant";
import { VoteResultsTable } from "@/components/game/Round/VoteResultsTable";
import { useRoundVotesQuery } from "@/queries/useRoundVotesQuery";

export type PendingMissionProps = {
  round: Round;
};

export const PendingMission = ({ round }: PendingMissionProps) => {
  const game = useGameContext();
  const { user, isSignedIn } = useAuth();
  const { data: votes } = useRoundVotesQuery({
    round: round.id,
    game: game.id,
  });

  const userIsMissionParticipant = useMemo(
    () =>
      isSignedIn &&
      round.teamPlayerIds.includes(user?.uid) &&
      // make sure they haven't already voted
      !round.decidedMissionOutcomePlayerIds.includes(user?.uid),
    [isSignedIn, round, user?.uid]
  );

  return (
    <Stack gap={2} alignItems={"center"}>
      {typeof votes !== "undefined" && <VoteResultsTable votes={votes} />}

      <Card elevation={3} sx={{ padding: 4 }}>
        {userIsMissionParticipant ? (
          <ActiveMissionParticipantView round={round} />
        ) : (
          <PassiveMissionParticipant round={round} />
        )}
      </Card>
    </Stack>
  );
};
