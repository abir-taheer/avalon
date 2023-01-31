import { AnonymousLoginButton, GoogleLoginButton } from "@/components";
import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { UndrawAuthentication } from "@/illustrations/UndrawAuthentication";
import { DialogContent, DialogTitle, Stack } from "@mui/material";

export type AuthRequiredDialogProps = void;

export const AuthRequiredDialog: UseDialogComponent<
  AuthRequiredDialogProps,
  boolean
> = ({ closeDialog }) => {
  return (
    <Stack
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      paddingBottom={1}
    >
      <UndrawAuthentication />
      <DialogTitle>You need to sign in first</DialogTitle>
      <DialogContent>
        <Stack direction={"row"} spacing={4}>
          <AnonymousLoginButton onSuccess={() => closeDialog(true)} />
          <GoogleLoginButton onSuccess={() => closeDialog(true)} />
        </Stack>
      </DialogContent>
    </Stack>
  );
};

export const useAuthRequiredDialog = () => {
  return useDialog<AuthRequiredDialogProps, boolean>(AuthRequiredDialog);
};
