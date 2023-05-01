import { SimpleAccordion } from "@/components/accordion/SimpleAccordion";
import { RoundVotingResults } from "@/components/game/Round/RoundVotingResults";
import { useGameContext } from "@/context/GameContext";
import { useRoundsQuery } from "@/queries/useRoundsQuery";
import { RoundStatus } from "@/types/schema";
import {
  CheckCircleOutline,
  CloseOutlined,
  SkipNextOutlined,
} from "@mui/icons-material";
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

const SuccessIcon = () => <CheckCircleOutline color={"success"} />;
const FailIcon = () => <CloseOutlined color={"error"} />;

const SkipIcon = () => <SkipNextOutlined color={"warning"} />;

export const GameHistory = () => {
  const game = useGameContext();
  const { data } = useRoundsQuery({ game: game.id });

  const rounds = useMemo(
    () => data?.filter((round) => round.id !== game.currentRoundId),
    [data, game]
  );

  if (!rounds?.length) {
    return null;
  }

  return (
    <SimpleAccordion
      summary={"Game History"}
      // It will not load the information about the players until the user clicks on the accordion
      renderDetailsIfHidden={false}
      initialState={false}
      accordionProps={{
        sx: { border: "1px solid rgba(0, 0, 0, 0.12)" },
      }}
    >
      <List>
        {rounds.map((round) => (
          <SimpleAccordion
            key={round.id}
            summary={
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <Typography>Round {round.number}</Typography>
                {round.status === RoundStatus.team_rejected && <SkipIcon />}
                {round.status === RoundStatus.team_rejected && (
                  <Typography variant={"caption"} color={"grey"}>
                    Team Rejected
                  </Typography>
                )}

                {round.status === RoundStatus.mission_failed && <FailIcon />}
                {round.status === RoundStatus.mission_failed && (
                  <Typography variant={"caption"} color={"grey"}>
                    Mission Failed
                  </Typography>
                )}

                {round.status === RoundStatus.mission_passed && <SuccessIcon />}
                {round.status === RoundStatus.mission_passed && (
                  <Typography variant={"caption"} color={"grey"}>
                    Mission Passed
                  </Typography>
                )}
              </Stack>
            }
            // It will not load the information about the players until the user clicks on the accordion
            renderDetailsIfHidden={false}
            initialState={false}
            accordionProps={{
              sx: { border: "1px solid rgba(0, 0, 0, 0.12)" },
            }}
          >
            <ListItem key={round.id}>
              <ListItemText
                primary={
                  <RoundVotingResults showDescriptor={false} round={round} />
                }
              />
            </ListItem>
          </SimpleAccordion>
        ))}
      </List>
    </SimpleAccordion>
  );
};
