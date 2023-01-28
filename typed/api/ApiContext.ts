import { NextApiRequest, NextApiResponse } from "next";
import { Auth, UserRecord } from "firebase-admin/lib/auth";
import { Game } from "@/typed/schema";
import * as firebaseAdmin from "firebase-admin";
import { Firestore } from "firebase-admin/lib/firestore";
import { Database } from "firebase-admin/lib/database";
import type { app } from "firebase-admin";

export type ApiContext = {
  req: NextApiRequest;
  res: NextApiResponse;
  user: UserRecord | null;
  getCurrentGame: (userId: string) => Promise<Game | null>;

  admin: typeof firebaseAdmin;
  app: app.App;

  auth: Auth;
  firestore: Firestore;
  realtime: Database;
};
