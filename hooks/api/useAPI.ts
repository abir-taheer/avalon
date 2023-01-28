import { useAtomValue } from "jotai";
import { idTokenAtom } from "@/atoms";
import { useApiResponseErrorDialog } from "@/components/dialog/error/useApiResponseErrorDialog";
import Axios, { AxiosError } from "axios";
import { useMemo } from "react";
import { appCheckTokenAtom } from "@/atoms/appCheckToken";
import { isApiHandlerResponse } from "@/typed/api/ApiHandlerResponse";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";

const baseURL = "/api";

export const useAPI = () => {
  const idToken = useAtomValue(idTokenAtom);
  const appCheckToken = useAtomValue(appCheckTokenAtom);
  const openErrorDialog = useApiResponseErrorDialog();

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
      async (error: AxiosError) => {
        const { response } = error;

        if (
          response &&
          isApiHandlerResponse(response?.data) &&
          response.data.success === false
        ) {
          const wrappedError = new ApiHandlerError({
            code: response.data.code,
            message: response.data.error,
            status: response.status,
          });

          await openErrorDialog({ error: wrappedError });
        } else {
          // We have no idea what happened, so just throw the error
          throw error;
        }
      }
    );

    return instance;
  }, [appCheckToken, idToken, openErrorDialog]);
};
