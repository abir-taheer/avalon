import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { Button, colors, Container, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { makeStyles } from "tss-react/mui";

export type SimpleConfirmDialogProps = {
  title: ReactNode;
  message: ReactNode;
};

const useStyles = makeStyles()((theme) => ({
  Root: {
    padding: theme.spacing(2),
  },
  LabelsList: {
    paddingLeft: theme.spacing(2),
    marginTop: 0,
  },
  LabelListItem: {
    color: colors.grey[500],
  },
  GoodCharacterItem: {
    color: colors.green[500],
  },
  EvilCharacterItem: {
    color: colors.red[500],
  },
}));

export const SimpleConfirmDialog: UseDialogComponent<
  SimpleConfirmDialogProps,
  boolean
> = ({ closeDialog, title, message }) => {
  const { classes } = useStyles();

  return (
    <Container maxWidth={"md"} className={classes.Root}>
      <Stack spacing={3}>
        <Typography
          variant={"h4"}
          textAlign={"center"}
          color={"primary"}
          gutterBottom
        >
          {title}
        </Typography>

        <Typography gutterBottom variant={"body2"}>
          {message}
        </Typography>

        <Stack direction={"row"} spacing={2}>
          <Button
            variant={"outlined"}
            color={"secondary"}
            fullWidth
            onClick={() => closeDialog(false)}
          >
            Cancel
          </Button>

          <Button
            variant={"contained"}
            color={"primary"}
            fullWidth
            onClick={() => closeDialog(true)}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export const useSimpleConfirmDialog = () => {
  return useDialog(SimpleConfirmDialog);
};
