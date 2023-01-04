import { authUserAtom, idTokenAtom } from "@/atoms";
import { auth } from "@/config";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export const useAuthListener = () => {
  const setAuthUser = useSetAtom(authUserAtom);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      setAuthUser(user ?? null);
    });
  }, [setAuthUser]);
};
