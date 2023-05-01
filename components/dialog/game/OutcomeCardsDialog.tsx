import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import {
  Container,
  Button,
  Typography,
  Card,
  Grid,
  colors,
  Stack,
  Fade,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Slide } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

export type OutcomeDialogProps = {
  outcomes: boolean[];
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

export const OutcomeDialog: UseDialogComponent<OutcomeDialogProps, null> = ({
  closeDialog,
  outcomes,
}) => {
  const { classes } = useStyles();
  const [render, setRender] = useState<boolean[]>([]);

  useEffect(() => {
    if (render.length === 0 || render.length < outcomes.length) {
      const delay = render.length === 0 ? 0 : 1000;

      const timeout = setTimeout(() => {
        const newVal = [...render];
        newVal.push(outcomes[render.length]);

        setRender(newVal);
      }, delay);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [render, outcomes]);

  const passed = useMemo(() => outcomes.every(Boolean), [render]);

  return (
    <Container maxWidth={"md"} className={classes.Root}>
      <Typography variant={"h4"} align={"center"} marginBottom={4}>
        Round Outcome
      </Typography>

      <Stack gap={4}>
        <Grid container gap={2}>
          {render.map((outcome, i) => (
            <Slide key={i} direction={"right"} timeout={1000} in>
              <Grid item xs={3}>
                <Card
                  sx={{
                    height: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    justifyItems: "center",
                    alignContent: "center",
                    backgroundColor: outcome
                      ? colors.green[500]
                      : colors.red[500],
                    color: "white",
                  }}
                >
                  <Typography>Pass</Typography>
                </Card>
              </Grid>
            </Slide>
          ))}
        </Grid>

        <Fade
          timeout={{ appear: 3000, enter: 1500, exit: 1500 }}
          in={render.length === outcomes.length}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Typography variant={"caption"} align={"center"}>
              {passed ? "The mission was a success" : "The mission failed"}
            </Typography>
          </div>
        </Fade>
      </Stack>

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

export const useOutcomeDialog = () => {
  return useDialog(OutcomeDialog);
};
