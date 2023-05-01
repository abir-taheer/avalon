import { PlayerName } from "@/components/auth/PlayerName";
import { Vote } from "@/types/schema";
import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";

export type VoteResultsTableProps = {
  votes: Vote[];
};

export const VoteResultsTable = ({ votes }: VoteResultsTableProps) => {
  const approvers = useMemo(
    () => votes?.filter((vote) => vote.approval) || [],
    [votes]
  );

  const rejectors = useMemo(
    () => votes?.filter((vote) => !vote.approval) || [],
    [votes]
  );

  return (
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
              color={"secondary"}
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
              color={"secondary"}
              variant={"caption"}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
