import { auth } from "@/client-config";
import { GoogleIcon } from "@/icons/Google";
import { Button, ButtonProps } from "@mui/material";
import classNames from "classnames";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { useCallback, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useSetAtom } from "jotai";
import { authCounterAtom } from "@/atoms";

const useStyles = makeStyles()((theme) => ({
  GoogleButton: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export type GoogleLoginButtonProps = ButtonProps & {
  onSuccess?: (user: UserCredential) => void;
};

export const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  const { classes } = useStyles();
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
      className={classNames(classes.GoogleButton, className)}
      {...rest}
    >
      Login With Google
    </Button>
  );
};
