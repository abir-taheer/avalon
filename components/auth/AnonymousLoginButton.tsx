import { auth } from "@/client-config";
import { Button, ButtonProps } from "@mui/material";
import { signInAnonymously, UserCredential } from "firebase/auth";
import { useCallback, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useSetAtom } from "jotai";
import { authCounterAtom } from "@/atoms";
import { useEditDisplayNameDialog } from "@/components/dialog/auth/useEditDisplayNameDialog";
import { updateUserProfile } from "@/utils/user/updateUserProfile";
import { getDefaultPhotoURL } from "@/utils";

const useStyles = makeStyles()((theme) => ({
  Button: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export type AnonymousLoginButtonProps = ButtonProps & {
  onSuccess?: (user: UserCredential) => void;
};

export const AnonymousLoginButton = (props: AnonymousLoginButtonProps) => {
  const { onSuccess, ...buttonProps } = props;
  const setAuthCounter = useSetAtom(authCounterAtom);
  const [loading, setLoading] = useState(false);
  const promptDisplayName = useEditDisplayNameDialog();
  const { classes } = useStyles();

  const login = useCallback(() => {
    setLoading(true);
    signInAnonymously(auth)
      .then(async (credential) => {
        const newProfile = await promptDisplayName({
          initialValue: credential.user.displayName ?? "",
        });

        if (newProfile?.displayName) {
          const name = newProfile.displayName;

          await updateUserProfile({
            displayName: name,
            photoURL: getDefaultPhotoURL({ name }),
          });
        }

        if (onSuccess) {
          onSuccess(credential);
        }
      })
      .finally(() => {
        setAuthCounter((c) => c + 1);
        setLoading(false);
      });
  }, [promptDisplayName, onSuccess, setAuthCounter]);

  return (
    <Button
      variant={"outlined"}
      color={"secondary"}
      onClick={login}
      disabled={loading}
      className={classes.Button}
      {...buttonProps}
    >
      {loading ? "Signing you in..." : "Continue as Guest"}
    </Button>
  );
};
