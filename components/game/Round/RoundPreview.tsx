import { Game, Round, RoundStatus } from "@/types/schema";
import { Rating, Stack, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Mood, SentimentVeryDissatisfied } from "@mui/icons-material";
import { ViewOnlyTeamPreview } from "@/components/game/Round/ViewOnlyTeamPreview";
import { useAuth } from "@/hooks";
import { TeamSelection } from "@/components/game/Round/TeamSelection";

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
    <Stack direction={"column"} className={classes.Root} gap={2}>
      <Typography align={"center"} variant={"h3"}>
        Round {round.number}
      </Typography>

      <Stack
        direction={"row"}
        gap={2}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Typography>
          {round.previousRejections} Team Rejection
          {round.previousRejections > 1 ? "s" : ""}
        </Typography>

        <Rating
          name={"fails"}
          readOnly
          max={3}
          value={round.previousRejections}
          icon={<SentimentVeryDissatisfied className={classes.FailIcon} />}
          emptyIcon={<Mood />}
        />
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
    </Stack>
  );
};
