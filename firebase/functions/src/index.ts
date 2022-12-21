import * as functions from "firebase-functions";
import { GameOptions } from "@/schema";
import * as admin from "firebase-admin";
import { randomString } from "./utils/randomString";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();

const db = admin.firestore();

type CreateRoomExpectedData = Partial<GameOptions>;

export const createRoom = functions.https.onCall(
  async (data: CreateRoomExpectedData, context) => {
    if (!context.auth?.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated in order to create a game"
      );
    }

    // validate the game options from data
    const options: GameOptions = {
      merlin: data.merlin ?? true,
      assassin: data.assassin ?? true,
      percival: data.percival ?? false,
      mordred: data.mordred ?? false,
      oberon: data.oberon ?? false,
      morgana: data.morgana ?? false,
    };

    const games = db.collection("games");

    const shortIdLength = Math.floor(Math.random() * 3) + 4;

    const shortId = randomString(shortIdLength).toUpperCase();

    const gameRef = await games.add({
      ownerId: context.auth.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      options,
      shortId,
      players: [
        {
          id: context.auth.uid,
          name: context.auth.token.name || "Anonymous",
          profilePicture: context.auth.token.picture || null,
        },
      ],
    });

    return gameRef.id;
  }
);
