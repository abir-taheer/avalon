import { idTokenAtom } from "@/atoms/user";
import { atom } from "jotai";
import { getToken } from "firebase/app-check";
import { appCheck } from "@/config";

export const appCheckTokenAtom = atom(async (get) => {
  const result = await getToken(appCheck, false);

  return result.token || null;
});
