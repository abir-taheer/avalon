import { auth } from "@/client-config";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useCallback } from "react";

export const SignOutButton = () => {
  const logout = useCallback(() => {
    signOut(auth).then(console.log);
  }, []);

  return <Button onClick={logout}>Sign Out</Button>;
};
