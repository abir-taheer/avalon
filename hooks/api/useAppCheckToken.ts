import { useEffect, useState } from "react";
import { getToken } from "firebase/app-check";
import { appCheck } from "@/client-config";
import { useApiResponseErrorDialog } from "@/components/dialog/error/ApiResponseErrorDialog";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";

export const useAppCheckToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const openErrorDialog = useApiResponseErrorDialog();

  useEffect(() => {
    getToken(appCheck, false)
      .then((result) => {
        setToken(result.token);
      })
      .catch(async (er) => {
        console.log(er);

        await openErrorDialog({
          error: new ApiHandlerError({
            message: "Unable to instantiate app check token. Are you human fr?",
            code: "permission-denied",
            status: 400,
          }),
        });
      });
  });

  return token;
};
