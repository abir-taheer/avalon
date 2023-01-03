import { authUserAtom, userAtom } from "@/atoms";
import { realtime } from "@/config";
import { RealTimeUser } from "@/schema";
import { pick } from "@/utils";
import { setUserId } from "firebase/analytics";
import { ref, onValue, update, onDisconnect } from "firebase/database";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

export const useSyncUserPresence = () => {
  const authUser = useAtomValue(authUserAtom);
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      return;
    }

    const online = {
      active: true,
    };

    const offline = {
      active: false,
    };

    const userRef = ref(realtime, "/user/" + authUser.uid);

    const unsubscribe = onValue(
      userRef,
      async (snapshot) => {
        const data: RealTimeUser = snapshot.val();

        if (!data) {
          await update(userRef, {
            ...online,
            ...pick(authUser, ["displayName", "photoURL", "uid"]),
          });
          return;
        }

        setUser(data);

        if (!data.active) {
          await update(userRef, online);
        }

        await onDisconnect(userRef).update(offline);
      },
      console.error
    );

    return unsubscribe;
  }, [authUser, setUser]);
};
