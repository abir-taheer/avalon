import { useAtomValue } from "jotai";
import { idTokenAtom } from "@/atoms";
import { useApiResponseErrorDialog } from "@/components/dialog/error/ApiResponseErrorDialog";
import Axios, { AxiosError } from "axios";
import { useMemo } from "react";
import { isApiHandlerResponse } from "@/types/api/ApiHandlerResponse";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { useAppCheckToken } from "@/hooks/api/useAppCheckToken";

const baseURL = "/api";

export const useAPI = () => {
  const idToken = useAtomValue(idTokenAtom);
  const appCheckToken = useAppCheckToken();
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

        console.log(isApiHandlerResponse(response?.data), "yes?");

        if (
          response &&
          isApiHandlerResponse(response?.data) &&
          response.data.success === false
        ) {
          const wrappedError = new ApiHandlerError({
            code: response.data.error.code,
            message: response.data.error.message,
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
