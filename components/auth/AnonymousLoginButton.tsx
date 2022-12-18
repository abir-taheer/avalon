import { useCallback } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/config";
import { Button } from "@/components";

export const AnonymousLoginButton = () => {
  const login = useCallback(() => {
    signInAnonymously(auth).then(console.log);
  }, []);

  return <Button onClick={login}>Login Anonymously</Button>;
};
