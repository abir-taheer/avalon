import { Button } from "@/components";
import { useCallback } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config";

export const GoogleLoginButton = () => {
  const login = useCallback(() => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(console.log);
  }, []);

  return <Button onClick={login}>Login With Google</Button>;
};
