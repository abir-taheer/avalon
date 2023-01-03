import { authUserAtom } from "@/atoms";
import { getAuth, updateProfile } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { app } from "./app";
import { fullName } from "faker-en";
import { getDefaultUserProfilePic } from "@/utils";

export const auth = getAuth(app);

export const useAuthListener = () => {
  const setUser = useSetAtom(authUserAtom);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null);
        return;
      }

      const displayName = user.displayName || fullName();
      const photoURL =
        user.photoURL || getDefaultUserProfilePic({ name: displayName });

      if (!user.displayName || !user.photoURL) {
        await updateProfile(user, {
          displayName,
          photoURL,
        });

        await auth.currentUser?.reload();
      }

      setUser(user);
    });
  }, [setUser]);
};
