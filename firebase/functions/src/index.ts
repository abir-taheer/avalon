import * as functions from "firebase-functions";
import { Game, GameOptions } from "@/schema";
import * as admin from "firebase-admin";

// We can't use our shorthand for this because this is a function and not a type
import { randomString } from "../../../utils";

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

    // Make sure they're not already in a game
    const games = db.collection("games");

    const existingGame = await games
      .where("playerIds", "array-contains", context.auth.uid)
      .where("active", "==", true)
      .get();

    if (existingGame.size > 0) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "You are already in a game"
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

    const shortIdLength = Math.floor(Math.random() * 3) + 4;

    const shortId = randomString(shortIdLength).toUpperCase();

    const newGame: Partial<Game> = {
      active: true,
      ownerId: context.auth.uid,
      createdAt:
        admin.firestore.FieldValue.serverTimestamp() as Game["createdAt"],
      options,
      shortId,
      playerIds: [context.auth.uid],
    };

    const gameRef = await games.add(newGame);

    return gameRef.id;
  }
);

exports.onUserStatusChanged = functions.database
  .ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    // Get the data written to Realtime Database
    const eventStatus = change.after.val();

    const userRef = db.doc("/users/" + context.params.uid);

    const statusSnapshot = await change.after.ref.once("value");

    const status = statusSnapshot.val();

    // If the current timestamp for this data is newer than
    // the data that triggered this event, we exit this function.
    if (status.last_changed > eventStatus.last_changed) {
      return null;
    }

    // Otherwise, we convert the last_changed field to a Date
    eventStatus.last_changed = new Date(eventStatus.last_changed);

    // ... and write it to Firestore.
    // update the user activity status in firebase
    return userRef.set(
      {
        active: eventStatus.state === "online",
      },
      { merge: true }
    );
  });
