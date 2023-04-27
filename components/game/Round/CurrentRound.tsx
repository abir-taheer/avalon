import { Game, RoundStatus } from "@/types/schema";
import { useRoundQuery } from "@/queries/useRoundQuery";
import { LinearProgress, Rating, Stack, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { PlayerName } from "@/components/auth/PlayerName";
import { Mood, SentimentVeryDissatisfied } from "@mui/icons-material";
import { ViewOnlyTeamPreview } from "@/components/game/Round/ViewOnlyTeamPreview";
import { useAuth } from "@/hooks";
import { TeamSelection } from "@/components/game/Round/TeamSelection";

export type CurrentRoundProps = {
  game: Game;
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

export const CurrentRound = ({ game }: CurrentRoundProps) => {
  const { classes } = useStyles();
  const { user } = useAuth();

  const { data, isLoading } = useRoundQuery({
    game: game.id,
    round: game.currentRoundId!,
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!data) {
    return (
      <Stack direction={"column"} gap={6} className={classes.Root}>
        <Typography color={"error"} align={"center"}>
          There was an error getting the information for the current round. Try
          refreshing the page?
        </Typography>
      </Stack>
    );
  }

  const round = data;

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
        <Typography>{round.previousFails} Fails</Typography>

        <Rating
          name={"fails"}
          readOnly
          max={3}
          value={round.previousFails}
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
