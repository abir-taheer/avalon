import { authCounterAtom } from "@/atoms";
import { auth } from "@/client-config";
import { useEditDisplayNameDialog } from "@/components/dialog/auth/useEditDisplayNameDialog";
import { getDefaultPhotoURL } from "@/utils";
import { updateUserProfile } from "@/utils/user/updateUserProfile";
import { Button, ButtonProps } from "@mui/material";
import { signInAnonymously, UserCredential } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";

export type AnonymousLoginButtonProps = ButtonProps & {
  onSuccess?: (user: UserCredential) => void;
};

export const AnonymousLoginButton = (props: AnonymousLoginButtonProps) => {
  const { onSuccess, ...buttonProps } = props;
  const setAuthCounter = useSetAtom(authCounterAtom);
  const [loading, setLoading] = useState(false);
  const promptDisplayName = useEditDisplayNameDialog();

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
      {...buttonProps}
    >
      {loading ? "Signing you in..." : "Continue as Guest"}
    </Button>
  );
};
