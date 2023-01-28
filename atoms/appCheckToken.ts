import { atom } from "jotai";
import { getToken } from "firebase/app-check";
import { appCheck } from "@/client-config";

export const appCheckTokenAtom = atom(async (get) => {
  try {
    const result = await getToken(appCheck, false);

    return result.token;
  } catch (error) {}

  return null;
});
