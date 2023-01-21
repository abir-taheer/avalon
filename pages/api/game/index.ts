import {
  ApiHandlerError,
  FirebaseAdminHandlerWithUser,
  withAuth,
} from "@/middleware";
import { Game } from "@/schema";
import { Timestamp } from "@firebase/firestore";
import { word } from "faker-en/word";
import { randomNumber } from "faker-en/utils/randomNumber";
import { isGameOptions } from "@/utils/type-checker/isGameOptions";

const createGame: FirebaseAdminHandlerWithUser = async (context) => {
  const { user, req, res, firestore, app } = context;

  if (!isGameOptions(req.body)) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "Invalid game options",
      status: 400,
    });
  }

  const numWords = randomNumber({ min: 3, max: 5 });
  const id = Array.from(Array(numWords), () => word()).join("-");

  const docWithId = await firestore.collection("games").doc(id).get();

  if (docWithId.exists && docWithId.data()?.active) {
    throw new ApiHandlerError({
      code: "internal",
      message:
        "The id generated for this game is already in use. This is an incredibly rare error, please try again.",
      status: 500,
    });
  }

  const game: Game = {
    id,
    active: true,
    ownerId: user.uid,
    playerIds: [user.uid],
    createdAt: Timestamp.now(),
    options: {
      ...req.body,
    },
  };

  await firestore.collection("games").doc(id).set(game);

  res.status(200).json({ id });
};

export default withAuth((context) => {
  if (context.req.method === "POST") {
    return createGame(context);
  }
});
