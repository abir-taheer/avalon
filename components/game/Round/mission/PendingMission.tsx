import { ActiveMissionParticipantView } from "@/components/game/Round/mission/ActiveMissionParticipantView";
import { PassiveMissionParticipant } from "@/components/game/Round/mission/PassiveMissionParticipant";
import { VoteResultsTable } from "@/components/game/Round/VoteResultsTable";
import { useGameContext } from "@/context/GameContext";
import { useAuth } from "@/hooks";
import { useRoundVotesQuery } from "@/queries/useRoundVotesQuery";
import { Round } from "@/types/schema";
import { Card, Stack } from "@mui/material";
import { useMemo } from "react";

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
