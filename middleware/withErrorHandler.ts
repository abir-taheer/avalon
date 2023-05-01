import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { NextApiHandler } from "next";

export const withErrorHandler = (next: NextApiHandler) => {
  const handler: NextApiHandler = async (req, res) => {
    try {
      return await next(req, res);
    } catch (e) {
      // If the error is of a known type, return it
      if (e instanceof ApiHandlerError) {
        return res.status(e.status).json({
          error: {
            message: e.message,
            code: e.code,
          },
          success: false,
        });
      }

      // Else log it before we return a 500
      // TODO - Add real error reporting
      console.error(e);
    }

    res.status(500).json({
      error: {
        message: "Internal server error",
        code: "internal",
      },
      success: false,
    });
  };

  return handler;
};
