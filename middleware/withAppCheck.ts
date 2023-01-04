import { app } from "@/firebase/admin";
import { NextApiHandler } from "next";

export const withAppCheck = (next: NextApiHandler) => {
  const handler: NextApiHandler = async (req, res) => {
    const appCheckToken = req.headers["x-firebase-appcheck"] || "";

    if (!appCheckToken || typeof appCheckToken !== "string") {
      return res.status(403).json({
        error: "AppCheck token is invalid",
      });
    }

    let appCheck;

    try {
      await app.appCheck().verifyToken(appCheckToken);
    } catch (e) {
      return res.status(403).json({
        error: "AppCheck token is invalid",
      });
    }

    next(req, res);
  };

  return handler;
};
