import { authUserAtom, userAtom } from "@/atoms";
import { RealTimeUser } from "@/schema";
import { pick } from "@/utils";
import { updateProfile, User } from "@firebase/auth";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export type RealTimeUserField = keyof RealTimeUser;

const publicFields: RealTimeUserField[] = ["displayName", "photoURL"];

export const useSyncUserMetadata = () => {
  const authUser = useAtomValue(authUserAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      return;
    }
  });

  useEffect(() => {
    if (!authUser || !user) {
      return;
    }

    const isNotSynced = publicFields.some(
      (field) => user[field] !== authUser[field as keyof User]
    );

    if (isNotSynced) {
      updateProfile(authUser, pick(user, publicFields));
    }
  }, [user, authUser]);
};
