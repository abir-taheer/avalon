import { app } from "@/firebase/admin";
import { UserInfo, UserRecord } from "firebase-admin/auth";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withAppCheck } from "./withAppCheck";
import { ErrorCode } from "./error-code";

export type ApiHandlerContext = {
  req: NextApiRequest;
  res: NextApiResponse;
  user: UserRecord | null;
  authRequired: () => void;
};

export type ApiHandlerWithContext = (
  context: ApiHandlerContext
) => any | Promise<any>;

export class ApiHandlerError extends Error {
  code: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

export const withContext = (next: ApiHandlerWithContext) => {
  const handler: NextApiHandler = async (req, res) => {
    let user: null | UserRecord = null;
    const idToken = req.headers.authorization?.replace(/^Bearer /i, "") || "";

    const auth = app.auth();

    try {
      const decodedToken = await auth.verifyIdToken(idToken);

      user = await auth.getUser(decodedToken.uid);
    } catch (e) {}

    const authRequired = () => {
      if (!user) {
        throw new ApiHandlerError(
          "unauthenticated",
          "Authentication is required"
        );
      }
    };

    const context: ApiHandlerContext = {
      req,
      res,
      user,
      authRequired,
    };

    try {
      const response = await next(context);
      res.status(200).json({ data: response });
    } catch (er) {
      if (er instanceof ApiHandlerError) {
        return res.status(403).json({ error: er.message, code: er.code });
      } else {
        console.error(er);

        return res
          .status(500)
          .json({ error: "There was an unknown error on the server" });
      }
    }
  };

  return withAppCheck(handler);
};
