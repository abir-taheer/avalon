import { useAtomValue } from "jotai";
import { authUserAtom, userAtom } from "@/atoms";
import { useMemo } from "react";
import { RealTimeUser } from "@/types/schema";
import { User } from "firebase/auth";

type AuthenticatedAuthResult = {
  isSignedIn: true;
  user: RealTimeUser;
  authUser: User;
};

type UnauthenticatedAuthResult = {
  isSignedIn: false;
  user: null;
  authUser: null;
};

export type UseAuthResult = AuthenticatedAuthResult | UnauthenticatedAuthResult;

export const useAuth = (): UseAuthResult => {
  const user = useAtomValue(userAtom);
  const authUser = useAtomValue(authUserAtom);

  const isSignedIn = useMemo(() => user && authUser, [user, authUser]);

  // Wrap in a use memo so that it doesn't unnecessarily keep creating new objects
  const value = useMemo(
    () => ({
      user,
      authUser,
      isSignedIn,
    }),
    [user, authUser, isSignedIn]
  );

  return value as unknown as UseAuthResult;
};
