import { useAuthRequiredDialog } from "@/components/dialog/auth/AuthRequiredDialog";
import { useCharacterGuideDialog } from "@/components/dialog/game/CharacterGuideDialog";
import { FlexCenter } from "@/components/flex/FlexCenter";
import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";
import { useNewGameForm } from "@/forms/NewGameForm/useNewGameForm";
import { useAuth } from "@/hooks";
import { useCreateGameMutation } from "@/mutations/useCreateGameMutation";
import { Button, Card, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  Card: {
    padding: theme.spacing(2),
  },
  Form: {
    paddingBottom: theme.spacing(2),
  },
}));

const NewGame = () => {
  const { classes } = useStyles();
  const { mutateAsync, isLoading } = useCreateGameMutation();
  const router = useRouter();
  const openGuide = useCharacterGuideDialog();
  const attemptAuth = useAuthRequiredDialog();
  const { user } = useAuth();
  const [actionQueued, setActionQueued] = useState(false);

  const form = useNewGameForm({
    onSubmit: async (values) => {
      if (!user) {
        const signedIn = await attemptAuth();

        if (signedIn) {
          setActionQueued(true);
        }

        return;
      }

      try {
        const { id } = await mutateAsync(values);
        await router.push(`/game/${id}`);
      } catch (e) {
        // TODO show dialog with specific error handling
      }
    },
  });

  const { submitForm, isSubmitting } = form;

  useEffect(() => {
    if (actionQueued && user) {
      setActionQueued(false);
      submitForm().then(console.log);
    }
  }, [submitForm, actionQueued, user]);

  return (
    <Container maxWidth={"md"}>
      <Card className={classes.Card}>
        <Typography variant={"h3"} textAlign={"center"} gutterBottom>
          New Game
        </Typography>
        <FlexCenter>
          <Button onClick={() => openGuide(undefined)}>
            View Character Guide
          </Button>
        </FlexCenter>
        <NewGameForm
          disabled={isLoading}
          form={form}
          className={classes.Form}
        />
        <Button
          onClick={submitForm}
          disabled={isSubmitting || isLoading}
          variant={"outlined"}
          fullWidth
        >
          Submit
        </Button>
      </Card>
    </Container>
  );
};

export default NewGame;
