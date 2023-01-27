import { NextApiHandler } from "next";
import { ErrorCode } from "./error-code";

export type ApiHandlerErrorProps = {
  code: ErrorCode;
  message: string;
  status?: number;
};

export class ApiHandlerError extends Error {
  code: ErrorCode;
  status: number;

  constructor({ code, message, status }: ApiHandlerErrorProps) {
    super(message);
    this.code = code;
    this.status = status || 400;
  }
}

export const withErrorHandler = (next: NextApiHandler) => {
  const handler: NextApiHandler = async (req, res) => {
    try {
      await next(req, res);
    } catch (e) {
      if (e instanceof ApiHandlerError) {
        res.status(e.status).json({
          error: e.message,
          code: e.code,
        });
      } else {
        console.error(e);
        res.status(500).json({
          error: "Internal server error",
        });
      }
    }
  };

  return handler;
};
