import { atom } from "jotai";
import axios, { AxiosInstance } from "axios";
import { idTokenAtom } from "./user";
import { appCheck } from "@/config";
import { getToken } from "firebase/app-check";

const baseURL = "/api";

export const apiAtom = atom(async (get) => {
  const idToken = get(idTokenAtom);
  const authorization = idToken ? `Bearer ${idToken}` : undefined;

  let appCheckToken = "";

  try {
    const result = await getToken(appCheck, false);

    if (result) {
      appCheckToken = result.token;
    }
  } catch (er) {}

  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: authorization,
      "X-Firebase-AppCheck": appCheckToken,
    },
  });

  instance.interceptors.response.use((response) => response.data);

  return instance;
});
