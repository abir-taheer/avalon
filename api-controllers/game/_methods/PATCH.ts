import { FirebaseAdminHandlerWithUser } from "@/middleware";
import { Game, GameOptions, isGameOptions } from "@/types/schema";
import { flattenObject, validateGameOptions } from "@/utils";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";

export type BodyParams = {
  game: string;
  options: GameOptions;
};

export type Response = {
  options: GameOptions;
};

export const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" &&
    isGameOptions(body.options) &&
    typeof body.game === "string" &&
    Boolean(body.game)
  );
};

export const Handler: FirebaseAdminHandlerWithUser = async (
  context
): Promise<Response> => {
  const { req, firestore, user } = context;

  if (!isBodyParams(req.body)) {
    throw new InvalidBodyParamsError();
  }

  const gameSnap = await firestore.collection("games").doc(req.body.game).get();

  if (!gameSnap.exists) {
    throw new ApiHandlerError({
      code: "not-found",
      message: `Game not found.`,
      status: 404,
    });
  }

  const game = gameSnap.data() as Game;

  if (game.ownerId !== user.uid) {
    throw new ApiHandlerError({
      code: "permission-denied",
      message: `Only the game owner can change game options.`,
      status: 403,
    });
  }

  const gameOptionsErrors = validateGameOptions(req.body.options);

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

  await gameSnap.ref.update({
    options: req.body.options,
  });

  return { options: req.body.options };
};
