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

export type ErrorDialogProps = {
  error: ApiHandlerError;
};

export const ErrorDialog: UseDialogComponent<ErrorDialogProps, null> = ({
  closeDialog,
  error,
}) => {
  return (
    <Stack
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      paddingBottom={1}
    >
      <UndrawNotify />
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
