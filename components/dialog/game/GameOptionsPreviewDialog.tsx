import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { Button, colors, Container, Stack, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Game } from "@/types/schema";
import { ViewOnlyOptionsPreview } from "@/components/game/GameWindow/ViewOnlyOptionsPreview";

export type GameOptionsPreviewDialogProps = {
  game: Game;
};

const useStyles = makeStyles()((theme) => ({
  Root: {
    padding: theme.spacing(2),
    width: 400,
    maxWidth: "85vw",
  },
}));

export const GameOptionsPreviewDialog: UseDialogComponent<
  GameOptionsPreviewDialogProps,
  null
> = ({ closeDialog, game }) => {
  const { classes } = useStyles();

  return (
    <Container maxWidth={"md"} className={classes.Root}>
      <Typography
        variant={"h3"}
        textAlign={"center"}
        color={"primary"}
        gutterBottom
      >
        Game Options
      </Typography>

      <ViewOnlyOptionsPreview game={game} />

      <Stack spacing={1}>
        <Button
          variant={"outlined"}
          fullWidth
          onClick={() => closeDialog(null)}
        >
          Close
        </Button>
      </Stack>
    </Container>
  );
};

export const useGameOptionsPreviewDialog = () => {
  return useDialog(GameOptionsPreviewDialog);
};
