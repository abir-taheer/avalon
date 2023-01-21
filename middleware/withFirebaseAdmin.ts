import { UserRecord } from "firebase-admin/auth";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as firebaseAdmin from "firebase-admin";
import { Firestore } from "firebase-admin/firestore";
import { Database } from "firebase-admin/database";
import { Auth } from "firebase-admin/auth";
import { FIREBASE_CONFIG } from "@/constants";
import { ApiHandlerError, withErrorHandler } from "./withErrorHandler";
import { app } from "firebase-admin";

type App = app.App;

const getApp = (): App => {
  try {
    return firebaseAdmin.app("[DEFAULT]");
  } catch (e) {}

  // @ts-expect-error
  const credential = new firebaseAdmin.credential.cert(FIREBASE_CONFIG);

  return firebaseAdmin.initializeApp(
    {
      credential,
      projectId: FIREBASE_CONFIG.project_id,
      databaseURL: `https://${FIREBASE_CONFIG.project_id}-default-rtdb.firebaseio.com`,
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

  admin: typeof firebaseAdmin;
  app: app.App;

  auth: Auth;
  firestore: Firestore;
  realtime: Database;
};

export const withFirebaseAdmin = (next: WithFirebaseAdminHandler) => {
  const handler: NextApiHandler = async (req, res) => {
    let user: null | UserRecord = null;
    const appCheckToken = req.headers["x-firebase-appcheck"] || "";
    const idToken = req.headers.authorization?.replace(/^Bearer /i, "") || "";

    const app = getApp();
    const auth = firebaseAdmin.auth();
    const firestore = firebaseAdmin.firestore();
    const realtime = firebaseAdmin.database();

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

      admin: firebaseAdmin,
      auth,
      firestore,
      realtime,
    };

    let response = await next(context);

    let levels = 1;

    // Await any promises that get returned up to 5 levels deep
    while (response instanceof Promise && levels < 5) {
      response = await response;
      levels++;
    }

    res.status(200).json({ data: response });
  };

  return withErrorHandler(handler);
};
