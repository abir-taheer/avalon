import { Round } from "@/types/schema";
import { useGameContext } from "@/context/GameContext";
import { useRoundVotesQuery } from "@/queries/useRoundVotesQuery";
import { Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { PlayerName } from "@/components/auth/PlayerName";
import { getRoundDescriptor } from "@/utils/game/getRoundDescriptor";

export type RoundVotingResultsProps = {
  round: Round;
};
export const RoundVotingResults = ({ round }: RoundVotingResultsProps) => {
  const game = useGameContext();
  const { data, isLoading } = useRoundVotesQuery({
    game: game.id,
    round: round.id,
  });

  const approvers = useMemo(
    () => data?.filter((vote) => vote.approval) || [],
    [data]
  );

  const rejectors = useMemo(
    () => data?.filter((vote) => !vote.approval) || [],
    [data]
  );

  const roundDescription = useMemo(
    () => getRoundDescriptor(round.status),
    [round]
  );

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack gap={2} alignItems={"center"}>
      <Typography variant={"caption"} color={"grey"} align={"center"}>
        {round.notes ?? roundDescription}
      </Typography>

      {round.teamPlayerIds.length > 0 && (
        <>
          <Typography sx={{ fontSize: 14 }}>
            <PlayerName playerId={round.leaderId} fontWeight={"bold"} />{" "}
            proposed the following team
          </Typography>

          <Stack direction={"row"} gap={4}>
            {round.teamPlayerIds.map((playerId) => (
              <PlayerName
                playerId={playerId}
                key={playerId}
                color={"secondary"}
                variant={"caption"}
              />
            ))}
          </Stack>

          <Divider sx={{ height: 1 }} />
        </>
      )}

      <Stack direction={"row"} gap={4}>
        {/*Approvals*/}
        <Stack alignItems={"center"} gap={2}>
          <Typography>Approved The Team:</Typography>

          {!approvers.length && (
            <Typography variant={"caption"} color={"grey"}>
              Nobody approved the team
            </Typography>
          )}

          <Stack>
            {approvers?.map((vote) => (
              <PlayerName
                playerId={vote.playerId}
                key={vote.playerId}
                color={"success"}
                variant={"caption"}
              />
            ))}
          </Stack>
        </Stack>

        {/*Rejections*/}
        <Stack alignItems={"center"} gap={2}>
          <Typography>Rejected The Team:</Typography>

          {!rejectors.length && (
            <Typography variant={"caption"} color={"grey"}>
              Nobody rejected the team
            </Typography>
          )}

          <Stack>
            {rejectors?.map((vote) => (
              <PlayerName
                playerId={vote.playerId}
                key={vote.playerId}
                color={"error"}
                variant={"caption"}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
