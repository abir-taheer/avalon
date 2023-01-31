import { ApiErrorCode, isApiErrorCode } from "@/types/api/ApiErrorCode";

export type ApiHandlerResponse<DataType = unknown> =
  | {
      data: DataType;
      success: true;

      // Error Fields
      error?: never;
      code?: never;
    }
  | {
      error: string;
      code: ApiErrorCode;
      success: false;

      // Success Fields
      data?: never;
    };

export const isApiHandlerResponse = (
  response: any
): response is ApiHandlerResponse => {
  const isSuccess =
    response.success === true && typeof response.data !== "undefined";
  const isError =
    response.success === false &&
    typeof response.error !== "undefined" &&
    isApiErrorCode(response.code);

  return isSuccess || isError;
};
