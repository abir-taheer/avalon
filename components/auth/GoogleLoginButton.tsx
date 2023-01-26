import { auth } from "@/config";
import { GoogleIcon } from "@/icons/Google";
import { Button, ButtonProps } from "@mui/material";
import classNames from "classnames";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback, useState } from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  GoogleButton: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export const GoogleLoginButton = (props: ButtonProps) => {
  const { classes } = useStyles();
  const { className, ...rest } = props;
  const [disabled, setDisabled] = useState(false);

  const login = useCallback(() => {
    const provider = new GoogleAuthProvider();

    setDisabled(true);
    signInWithPopup(auth, provider)
      .catch()
      .finally(() => {
        setDisabled(false);
      });
  }, []);

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
