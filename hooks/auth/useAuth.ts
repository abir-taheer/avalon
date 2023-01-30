import { useAtomValue } from "jotai";
import { authUserAtom, userAtom } from "@/atoms";
import { useMemo } from "react";

export const useAuth = () => {
  const user = useAtomValue(userAtom);
  const authUser = useAtomValue(authUserAtom);

  const isSignedIn = useMemo(() => user && authUser, [user, authUser]);

  return {
    user,
    authUser,
    isSignedIn,
  };
};
