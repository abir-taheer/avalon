import { appCheck } from "@/client-config";
import { useApiResponseErrorDialog } from "@/components/dialog/error/ApiResponseErrorDialog";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { getToken } from "firebase/app-check";
import { useEffect, useState } from "react";

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

        const error = new ApiHandlerError({
          message: "Unable to instantiate app check token. Are you human fr?",
          code: "permission-denied",
          status: 400,
        });

        await openErrorDialog({ error });
      });
  });

  return token;
};
