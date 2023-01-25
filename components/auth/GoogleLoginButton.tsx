import { Button, ButtonProps } from "@mui/material";
import { useCallback, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config";
import { GoogleIcon } from "@/icons/Google";

export const GoogleLoginButton = (props: ButtonProps) => {
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
      sx={{ padding: "0.5rem 1rem" }}
      {...props}
    >
      Login With Google
    </Button>
  );
};
