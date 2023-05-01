import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { Button, Container, Stack, Typography, colors } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactNode } from "react";

export type NotifyDialogProps = {
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
}));

export const NotifyDialog: UseDialogComponent<NotifyDialogProps, null> = ({
  closeDialog,
  title,
  message,
}) => {
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
            variant={"contained"}
            color={"primary"}
            fullWidth
            onClick={() => closeDialog(null)}
          >
            Close
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export const useNotifyDialog = () => {
  return useDialog(NotifyDialog);
};
