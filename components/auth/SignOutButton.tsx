import { authCounterAtom } from "@/atoms";
import { auth } from "@/client-config";
import { useAuth } from "@/hooks";
import { setIsSigningOut } from "@/utils/auth/isSigningOut";
import { updateUserProfile } from "@/utils/user/updateUserProfile";
import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useCallback } from "react";

export type SignOutButtonProps = {
  fullWidth?: boolean;
};

export const SignOutButton = (props: SignOutButtonProps) => {
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
    <Button
      color={"error"}
      onClick={logout}
      startIcon={<Logout />}
      variant={"outlined"}
      {...props}
    >
      Sign Out
    </Button>
  );
};
