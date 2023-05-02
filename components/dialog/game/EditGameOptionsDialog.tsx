import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { Button, Container, Stack, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Game, GameOptions } from "@/types/schema";
import { useNewGameForm } from "@/forms/NewGameForm/useNewGameForm";
import { useEditGameOptionsVoteMutation } from "@/mutations/useEditGameOptionsMutation";
import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";

export type EditGameOptionsDialogProps = {
  game: Game;
};

const useStyles = makeStyles()((theme) => ({
  Root: {
    padding: theme.spacing(2),
    width: 450,
    maxWidth: "85vw",
  },
}));

export const EditGameOptionsDialog: UseDialogComponent<
  EditGameOptionsDialogProps,
  null
> = ({ closeDialog, game }) => {
  const { classes } = useStyles();
  const { mutateAsync, isLoading } = useEditGameOptionsVoteMutation();

  const handleSubmit = async (values: GameOptions) => {
    await mutateAsync({
      game: game.id,
      options: values,
    });
    closeDialog(null);
  };

  const form = useNewGameForm({
    initialValues: game.options,
    onSubmit: handleSubmit,
  });

  return (
    <Container maxWidth={"md"} className={classes.Root}>
      <Typography
        variant={"h3"}
        textAlign={"center"}
        color={"primary"}
        gutterBottom
      >
        Edit Game Options
      </Typography>

      <NewGameForm form={form} />

      <Stack spacing={2} direction={"row"} marginTop={4}>
        <Button
          variant={"outlined"}
          fullWidth
          onClick={() => closeDialog(null)}
        >
          Cancel
        </Button>

        <Button
          onClick={form.submitForm}
          disabled={isLoading}
          fullWidth
          variant={"contained"}
        >
          Save
        </Button>
      </Stack>
    </Container>
  );
};

export const useEditGameOptionsDialog = () => {
  return useDialog(EditGameOptionsDialog);
};
