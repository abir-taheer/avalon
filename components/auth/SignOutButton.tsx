import { auth, realtime } from "@/client-config";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { authCounterAtom } from "@/atoms";
import { useAuth } from "@/hooks";
import { updateUserProfile } from "@/utils/user/updateUserProfile";
import { Logout } from "@mui/icons-material";
import { setIsSigningOut } from "@/utils/auth/isSigningOut";

export const SignOutButton = () => {
  const setAuthCounter = useSetAtom(authCounterAtom);
  const { user } = useAuth();

  const logout = useCallback(async () => {
    if (!user) {
      return;
    }

    setIsSigningOut(true);

    await updateUserProfile({ active: false });

    signOut(auth)
      .then(console.log)
      .finally(() => {
        setIsSigningOut(false);
        setAuthCounter((c) => c + 1);
      });
  }, [user, setAuthCounter]);

  return (
    <Button onClick={logout} startIcon={<Logout />} variant={"outlined"}>
      Sign Out
    </Button>
  );
};
