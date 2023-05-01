import { PlayerName } from "@/components/auth/PlayerName";
import { Round } from "@/types/schema";
import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";

export type PassiveMissionParticipantProps = { round: Round };
export const PassiveMissionParticipant = ({
  round,
}: PassiveMissionParticipantProps) => {
  const hasntDecided = useMemo(
    () =>
      round.teamPlayerIds.filter(
        (id) => !round.decidedMissionOutcomePlayerIds.includes(id)
      ),
    [round]
  );

  return (
    <Stack gap={2}>
      <Typography>
        Waiting for{" "}
        {round.teamPlayerIds.map((id, index) => (
          <>
            <PlayerName playerId={id} key={id} color={"secondary"} />
            {index === round.teamSize - 2
              ? " & "
              : index === round.teamSize - 1
              ? " "
              : ", "}
          </>
        ))}
        to decide the mission outcome
      </Typography>

      <Typography align={"center"} variant={"caption"} color={"grey"}>
        The following players still need to decide
      </Typography>

      <Stack direction={"row"} gap={4} justifyContent={"center"}>
        {hasntDecided.map((id) => (
          <PlayerName
            playerId={id}
            key={id}
            color={"secondary"}
            variant={"caption"}
          />
        ))}
      </Stack>
    </Stack>
  );
};
