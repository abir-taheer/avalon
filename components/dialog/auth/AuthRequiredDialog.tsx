import { AnonymousLoginButton, GoogleLoginButton } from "@/components";
import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import { UndrawAuthentication } from "@/illustrations/UndrawAuthentication";
import { DialogContent, DialogTitle, Stack } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export type AuthRequiredDialogProps = void;

const useStyles = makeStyles()((theme) => ({
  Root: {
    minWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  Illustration: {
    width: 150,
    height: 220,
    objectFit: "contain",
  },
}));

export const AuthRequiredDialog: UseDialogComponent<
  AuthRequiredDialogProps,
  boolean
> = ({ closeDialog }) => {
  const { classes } = useStyles();

  return (
    <Stack
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      paddingBottom={1}
      className={classes.Root}
    >
      <UndrawAuthentication className={classes.Illustration} />
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
