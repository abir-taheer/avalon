import { FIREBASE_CONFIG } from "@/constants";
import * as firebaseAdmin from "firebase-admin";

// @ts-ignore
const credential = new firebaseAdmin.credential.cert(FIREBASE_CONFIG);

// During dev this causes issues cause initializeApp is called twice
// Prevent this by checking to see if the app is already initalized before calling again

export let app: firebaseAdmin.app.App;

try {
  app = firebaseAdmin.app("[DEFAULT]");
} catch (er) {
  app = firebaseAdmin.initializeApp(
    {
      credential,
      projectId: FIREBASE_CONFIG.project_id,
    },
    "[DEFAULT]"
  );
}
