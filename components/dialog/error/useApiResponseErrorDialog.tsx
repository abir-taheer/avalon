import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { Container, DialogTitle, DialogContent, Button } from "@mui/material";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";

export type ErrorDialogProps = {
  error: ApiHandlerError;
};

export const ErrorDialog: UseDialogComponent<ErrorDialogProps, null> = ({
  closeDialog,
  error,
}) => {
  return (
    <Container maxWidth={"sm"}>
      <DialogTitle>There was an error performing that action</DialogTitle>
      <DialogContent>
        <pre>
          {error.code} - {error.message}
        </pre>
      </DialogContent>

      <Button onClick={() => closeDialog(null)}>Close</Button>
    </Container>
  );
};

export const useApiResponseErrorDialog = () => {
  return useDialog(ErrorDialog);
};
