import * as firebaseAdmin from "firebase-admin";
import { Game, GameStatus } from "@/types/schema";
import { UserRecord } from "firebase-admin/auth";
import { NextApiHandler } from "next";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { withErrorHandler } from "@/middleware/withErrorHandler";
import { ApiHandlerWithContext } from "@/types/api/ApiHandlerWithContext";
import { ApiContext } from "@/types/api/ApiContext";
import { app } from "firebase-admin";
import { FIREBASE_CONFIG } from "@/constants";

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

export const withApiContext = (next: ApiHandlerWithContext) => {
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

    const getCurrentGame = async (userId: string) => {
      const games = await firestore
        .collection("games")
        .where("playerIds", "array-contains", userId)
        .where("status", "in", [GameStatus.waiting, GameStatus.started])
        .get();

      if (games.empty) {
        return null;
      }

      return games.docs?.[0]?.data() as Game;
    };

    const context: ApiContext = {
      app,
      req,
      res,
      user,
      getCurrentGame,

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

    // Return a success of true unless an error was thrown
    res.status(200).json({ data: response, success: true });
  };

  return withErrorHandler(handler);
};
