import { UserRecord } from "firebase-admin/auth";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as firebaseAdmin from "firebase-admin";
import { App } from "firebase-admin/app";
import { FIREBASE_CONFIG } from "@/constants";
import { ApiHandlerError, withErrorHandler } from "./withErrorHandler";

const getApp = () => {
  try {
    return firebaseAdmin.app("[DEFAULT]");
  } catch (e) {}

  // @ts-expect-error
  const credential = new firebaseAdmin.credential.cert(FIREBASE_CONFIG);

  return firebaseAdmin.initializeApp(
    {
      credential,
      projectId: FIREBASE_CONFIG.project_id,
    },
    "[DEFAULT]"
  );
};

export type WithFirebaseAdminHandler = (
  context: WithFirebaseAdminContext
) => any | Promise<any>;

export type WithFirebaseAdminContext = {
  req: NextApiRequest;
  res: NextApiResponse;
  user: UserRecord | null;
  app: App;
};

export const withFirebaseAdmin = (next: WithFirebaseAdminHandler) => {
  const handler: NextApiHandler = async (req, res) => {
    let user: null | UserRecord = null;
    const appCheckToken = req.headers["x-firebase-appcheck"] || "";
    const idToken = req.headers.authorization?.replace(/^Bearer /i, "") || "";

    const app = getApp();
    const auth = app.auth();

    try {
      if (!appCheckToken || typeof appCheckToken !== "string") {
        // Just trigger the catch handler
        throw new Error();
      }

      await app.appCheck().verifyToken(appCheckToken);
    } catch (er) {
      throw new ApiHandlerError({
        code: "permission-denied",
        message: "A valid app-check token is required to use this api",
        status: 400,
      });
    }

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      user = await auth.getUser(decodedToken.uid);
    } catch (e) {}

    const context: WithFirebaseAdminContext = {
      app,
      req,
      res,
      user,
    };

    const response = await next(context);
    res.status(200).json({ data: response });
  };

  return withErrorHandler(handler);
};
