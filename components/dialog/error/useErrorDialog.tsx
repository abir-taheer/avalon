import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { Container, DialogTitle, DialogContent, Button } from "@mui/material";

export type ErrorDialogProps = {
  error: Error;
};

export const ErrorDialog: UseDialogComponent<ErrorDialogProps, null> = ({
  closeDialog,
  error,
}) => {
  return (
    <Container maxWidth={"sm"}>
      <DialogTitle>There was an error performing that action</DialogTitle>
      <DialogContent>
        <pre>{error.message}</pre>
      </DialogContent>

      <Button onClick={() => closeDialog(null)}>Close</Button>
    </Container>
  );
};

export const useErrorDialog = () => {
  return useDialog(ErrorDialog);
};
