import { useCallback, useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/config";
import { Button, ButtonProps } from "@mui/material";

export const AnonymousLoginButton = (props: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  const login = useCallback(() => {
    setLoading(true);
    signInAnonymously(auth).finally(() => setLoading(false));
  }, []);

  return (
    <Button
      variant={"outlined"}
      color={"secondary"}
      onClick={login}
      disabled={loading}
      {...props}
    >
      {loading ? "Signing you in..." : "Continue as Guest"}
    </Button>
  );
};
