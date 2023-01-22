import { authUserAtom, idTokenAtom, userAtom } from "@/atoms";
import { auth } from "@/config";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { realtime } from "@/config";
import { onDisconnect, onValue, ref, set, update } from "firebase/database";
import { RealTimeUser } from "@/schema";
import { fullName } from "faker-en";
import { updateProfile } from "firebase/auth";
import { getDefaultPhotoURL } from "@/utils";

export const useAuthListener = () => {
  const [authUser, setAuthUser] = useAtom(authUserAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      setAuthUser(user ?? null);
    });
  }, [setAuthUser]);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      return;
    }

    const userRef = ref(realtime, "/user/" + authUser.uid);

    const unsubscribe = onValue(
      userRef,
      async (snapshot) => {
        const data: RealTimeUser | null = snapshot.val();

        if (data) {
          setUser(data);
          return;
        }

        // Else we need to create it
        let { displayName, photoURL, uid } = authUser;

        if (!displayName) {
          displayName = fullName();
          await updateProfile(authUser, { displayName });
        }

        if (!photoURL) {
          photoURL = getDefaultPhotoURL({ name: displayName });

          await updateProfile(authUser, { photoURL });
        }

        const user: RealTimeUser = {
          uid,
          displayName,
          photoURL,
          active: true,
        };

        await set(userRef, user);

        setUser(user);
      },
      console.error
    );

    const offline = {
      active: false,
    };

    onDisconnect(userRef).update(offline);

    return unsubscribe;
  }, [authUser, setUser]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!user.active) {
      const userRef = ref(realtime, "/user/" + user.uid);

      update(ref(realtime, "/user/" + user.uid), {
        active: true,
      });
    }
  }, [user]);
};
