import { useAtomValue } from "jotai";
import { idTokenAtom } from "@/atoms";
import { useErrorDialog } from "@/components/dialog/error/useErrorDialog";
import Axios from "axios";
import { useMemo } from "react";
import { appCheckTokenAtom } from "@/atoms/appCheckToken";

const baseURL = "/api";

export const useAPI = () => {
  const idToken = useAtomValue(idTokenAtom);
  const appCheckToken = useAtomValue(appCheckTokenAtom);
  const openErrorDialog = useErrorDialog();

  return useMemo(() => {
    const authorization = idToken ? `Bearer ${idToken}` : undefined;

    const instance = Axios.create({
      baseURL,
      headers: {
        Authorization: authorization,
        "X-Firebase-AppCheck": appCheckToken ?? "",
      },
    });

    instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.log(error);
        openErrorDialog({ error });
      }
    );

    return instance;
  }, [appCheckToken, idToken, openErrorDialog]);
};
