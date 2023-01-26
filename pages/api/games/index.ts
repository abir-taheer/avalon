import {
  ApiHandlerError,
  FirebaseAdminHandlerWithUser,
  withAuth,
} from "@/middleware";
import { Game, GameStatus } from "@/schema";
import { isGameOptions, validateGameOptions, flattenObject } from "@/utils";
import { Timestamp } from "@firebase/firestore";
import { word } from "faker-en/word";

const getGameId = (length: number) => {
  return Array.from(Array(length), () => word()).join("-");
};

const POST_Games: FirebaseAdminHandlerWithUser = async (
  context
): Promise<POST_GamesAPIResponse> => {
  const { user, req, admin, firestore, getCurrentGame } = context;

  if (!isGameOptions(req.body)) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "Invalid game options",
      status: 400,
    });
  }

  const gameOptionsErrors = validateGameOptions(req.body);

  // We might have nested errors in the case of characters
  // So we flatten the errors object into an array of error messages for simple error checking
  const flatErrorMap = flattenObject<string>(gameOptionsErrors);

  const fieldsWithErrors = Object.keys(flatErrorMap);

  if (fieldsWithErrors.length > 0) {
    const firstErrorKey = fieldsWithErrors[0];
    const firstErrorValue = flatErrorMap[firstErrorKey];

    throw new ApiHandlerError({
      code: "invalid-argument",
      message: `Invalid game options. ${firstErrorKey} - ${firstErrorValue}`,
      status: 400,
    });
  }

  // Check to make sure they're not already in a game
  const usersCurrentGame = await getCurrentGame(user.uid);

  if (usersCurrentGame !== null) {
    throw new ApiHandlerError({
      code: "permission-denied",
      message: "You are already in a game. Leave it before creating another.",
      status: 400,
    });
  }

  let idLength = 3;

  // Generate an id for the game
  let id = getGameId(idLength);

  let idExistsAlready = false;

  // Make sure the id is unique
  // Most likely will never need more than a single try but just for safety
  do {
    const doc = await firestore.collection("games").doc(id).get();
    idExistsAlready = doc.exists;

    if (idExistsAlready) {
      idLength++;
      id = getGameId(idLength);
    }
  } while (idExistsAlready && idLength < 10);

  // Absolutely no idea how this would happen but just in case
  if (idExistsAlready) {
    throw new ApiHandlerError({
      code: "internal",
      message: "Unable to generate a unique game id. Contact game developers.",
      status: 500,
    });
  }

  const game: Game = {
    id,
    status: GameStatus.waiting,
    ownerId: user.uid,
    playerIds: [user.uid],
    createdAt: admin.firestore.FieldValue.serverTimestamp() as Timestamp,
    options: req.body,
  };

  await firestore.collection("games").doc(id).set(game);

  return { id };
};

export default withAuth(async (context) => {
  if (context.req.method === "POST") {
    return POST_Games(context);
  }

  throw new ApiHandlerError({
    code: "unimplemented",
    message: "This method is not implemented",
    status: 405,
  });
});

export type POST_GamesAPIResponse = {
  id: string;
};
