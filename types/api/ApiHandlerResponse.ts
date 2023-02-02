import { ApiErrorCode, isApiErrorCode } from "@/types/api/ApiErrorCode";

export type ApiHandlerResponse<DataType = unknown> =
  | {
      data: DataType;
      success: true;

      // Error Fields
      error?: never;
    }
  | {
      error: {
        message: string;
        code: ApiErrorCode;
      };
      success: false;

      // Success Fields
      data?: never;
    };

export const isApiHandlerResponse = (
  response: any
): response is ApiHandlerResponse => {
  if (typeof response !== "object") {
    return false;
  }

  const isSuccess =
    response.success === true && typeof response.data !== "undefined";

  const isError =
    response.success === false &&
    typeof response.error === "object" &&
    isApiErrorCode(response.error.code);

  return isSuccess || isError;
};
