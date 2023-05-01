import { Game, Round, RoundStatus } from "@/types/schema";
import { Card, Rating, Stack, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Mood, SentimentVeryDissatisfied } from "@mui/icons-material";
import { ViewOnlyTeamPreview } from "@/components/game/Round/ViewOnlyTeamPreview";
import { useAuth } from "@/hooks";
import { TeamSelection } from "@/components/game/Round/TeamSelection";
import { TeamVote } from "@/components/game/Round/TeamVote";
import { PendingMission } from "@/components/game/Round/PendingMission";

export type CurrentRoundProps = {
  game: Game;
  round: Round;
};

const useStyles = makeStyles()((theme) => ({
  Root: {
    paddingTop: theme.spacing(4),
  },
  FailIcon: {
    color: theme.palette.error.main,
  },
  HappyIcon: {
    color: theme.palette.success.main,
  },
}));

export const RoundPreview = ({ game, round }: CurrentRoundProps) => {
  const { classes } = useStyles();
  const { user } = useAuth();

  return (
    <Stack direction={"column"} className={classes.Root} gap={4}>
      <Stack gap={2}>
        <Typography align={"center"} variant={"h3"} fontWeight={"bold"}>
          Round {round.number}
        </Typography>

        <Stack
          direction={"row"}
          gap={2}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Typography variant={"caption"} sx={{ fontSize: 14 }} color={"grey"}>
            {round.previousRejections} Team Rejection
            {round.previousRejections === 1 ? "" : "s"}
          </Typography>

          <Rating
            name={"fails"}
            readOnly
            max={5}
            value={round.previousRejections}
            icon={
              <SentimentVeryDissatisfied
                className={classes.FailIcon}
                sx={{ fontSize: 20 }}
              />
            }
            emptyIcon={<Mood sx={{ fontSize: 20 }} />}
          />
        </Stack>
      </Stack>

      {round.status === RoundStatus.team_selection && (
        <>
          {round.leaderId === user?.uid && (
            <TeamSelection game={game} round={round} />
          )}

          {round.leaderId !== user?.uid && (
            <ViewOnlyTeamPreview game={game} round={round} />
          )}
        </>
      )}

      {round.status === RoundStatus.voting && <TeamVote round={round} />}

      {round.status === RoundStatus.mission_pending && (
        <PendingMission round={round} />
      )}
    </Stack>
  );
};
