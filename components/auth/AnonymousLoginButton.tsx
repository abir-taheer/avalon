import { useCallback, useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/config";
import { Button, ButtonProps } from "@mui/material";

export const AnonymousLoginButton = (props: ButtonProps) => {
  const [disabled, setDisabled] = useState(false);
  const login = useCallback(() => {
    setDisabled(true);
    signInAnonymously(auth).finally(() => setDisabled(false));
  }, []);

  return (
    <Button
      variant={"outlined"}
      color={"secondary"}
      onClick={login}
      disabled={disabled}
      {...props}
    >
      Continue as Guest
    </Button>
  );
};
