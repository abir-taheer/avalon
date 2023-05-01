import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { UndrawNotify } from "@/illustrations/UndrawNotify";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import {
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";

export type ErrorDialogProps = {
  error: ApiHandlerError;
};

const useStyles = makeStyles()((theme) => ({
  Root: {
    minWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  NotifyIllustration: {
    minWidth: 200,
    minHeight: 200,
  },
}));

export const ErrorDialog: UseDialogComponent<ErrorDialogProps, null> = ({
  closeDialog,
  error,
}) => {
  const { classes } = useStyles();

  return (
    <Stack
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      paddingBottom={1}
      className={classes.Root}
    >
      <UndrawNotify className={classes.NotifyIllustration} />
      <DialogTitle color={"error"}>{error.code}</DialogTitle>
      <DialogContent>
        <Typography variant={"body2"} textAlign={"center"}>
          {error.message}
        </Typography>
      </DialogContent>

      <Button fullWidth onClick={() => closeDialog(null)}>
        Close
      </Button>
    </Stack>
  );
};

export const useApiResponseErrorDialog = () => {
  return useDialog(ErrorDialog);
};
