import { auth } from "@/config";
import { useCallback } from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";

export const SignOutButton = () => {
  const logout = useCallback(() => {
    signOut(auth).then(console.log);
  }, []);

  return <Button onClick={logout}>Sign Out</Button>;
};
