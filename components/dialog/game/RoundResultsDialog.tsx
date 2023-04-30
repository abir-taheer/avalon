import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { Container, Button, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Game, Round } from "@/types/schema";
import { GameContext } from "@/context/GameContext";
import { RoundVotingResults } from "@/components/game/Round/RoundVotingResults";

export type RoundResultsDialogProps = {
  game: Game;
  round: Round;
};

const useStyles = makeStyles()((theme) => ({
  Root: {
    padding: theme.spacing(2),
    width: 500,
    maxWidth: "90vw",
  },
  CloseButton: {
    marginTop: theme.spacing(4),
  },
}));

export const RoundResultsDialog: UseDialogComponent<
  RoundResultsDialogProps,
  null
> = ({ closeDialog, game, round }) => {
  const { classes } = useStyles();

  return (
    <Container maxWidth={"md"} className={classes.Root}>
      <Typography variant={"h4"} align={"center"} marginBottom={4}>
        Round Results
      </Typography>
      <GameContext.Provider value={game}>
        <RoundVotingResults round={round} />
      </GameContext.Provider>

      <Button
        className={classes.CloseButton}
        onClick={() => closeDialog(null)}
        fullWidth
        variant={"outlined"}
      >
        Close
      </Button>
    </Container>
  );
};

export const useRoundResultsDialog = () => {
  return useDialog(RoundResultsDialog);
};
