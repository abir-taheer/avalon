import { ApiErrorCode } from "@/types/api";

export type ApiHandlerErrorProps = {
  code: ApiErrorCode;
  message: string;
  status?: number;
};

export class ApiHandlerError extends Error {
  code: ApiErrorCode;
  status: number;

  constructor({ code, message, status }: ApiHandlerErrorProps) {
    super(message);
    this.code = code;
    this.status = status || 400;
  }
}
