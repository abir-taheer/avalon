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
import {
  FormControl,
  FormControlLabel,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

const SuccessIcon = () => <CheckCircleOutline color={"success"} />;
const FailIcon = () => <CloseOutlined color={"error"} />;

const SkipIcon = () => <SkipNextOutlined color={"warning"} />;

export const GameHistory = () => {
  const game = useGameContext();
  const [reverse, setReverse] = useState(true);
  const [open, setOpen] = useState(true);
  const { data } = useRoundsQuery({ game: game.id, skip: !open });
  const [openAccordionIds, setOpenAccordionIds] = useState<string[]>([]);

  const rounds = useMemo(
    () => data?.filter((round) => round.id !== game.currentRoundId) || [],
    [data, game]
  );

  const render = useMemo(
    () => (reverse ? [...rounds].reverse() : rounds),
    [reverse, rounds]
  );

  if (game.roundResults.length === 0) {
    return null;
  }

  return (
    <SimpleAccordion
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      summary={"Game History"}
      // It will not load the information about the players until the user clicks on the accordion
      renderDetailsIfHidden={false}
      initialState={open}
      accordionProps={{
        sx: (theme) => ({
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
        }),
      }}
    >
      <FormControl sx={{ padding: 2 }}>
        <FormControlLabel
          control={
            <Switch checked={reverse} onClick={() => setReverse(!reverse)} />
          }
          label={"Reverse Order"}
        />
      </FormControl>

      <Grid container spacing={1}>
        {render.map((round) => (
          <Grid
            item
            key={round.id}
            xs={12}
            md={openAccordionIds.includes(round.id) ? 12 : 6}
          >
            <SimpleAccordion
              onClose={() =>
                setOpenAccordionIds((a) => a.filter((b) => b !== round.id))
              }
              onOpen={() => setOpenAccordionIds((a) => [...a, round.id])}
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

                  {round.status === RoundStatus.mission_passed && (
                    <SuccessIcon />
                  )}
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
          </Grid>
        ))}
      </Grid>
    </SimpleAccordion>
  );
};
