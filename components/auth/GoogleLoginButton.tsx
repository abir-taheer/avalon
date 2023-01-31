import { authCounterAtom } from "@/atoms";
import { auth } from "@/client-config";
import { GoogleIcon } from "@/icons/Google";
import { Button, ButtonProps } from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";

export type GoogleLoginButtonProps = ButtonProps & {
  onSuccess?: (user: UserCredential) => void;
};

export const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  const { className, onSuccess, ...rest } = props;
  const setAuthCounter = useSetAtom(authCounterAtom);
  const [disabled, setDisabled] = useState(false);

  const login = useCallback(() => {
    const provider = new GoogleAuthProvider();

    setDisabled(true);
    signInWithPopup(auth, provider)
      .then((user) => {
        if (onSuccess) {
          onSuccess(user);
        }
      })
      .catch()
      .finally(() => {
        setAuthCounter((c) => c + 1);
        setDisabled(false);
      });
  }, [onSuccess, setAuthCounter]);

  return (
    <Button
      onClick={login}
      startIcon={<GoogleIcon />}
      variant={"outlined"}
      disabled={disabled}
      {...rest}
    >
      Login With Google
    </Button>
  );
};
