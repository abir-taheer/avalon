import { FirebaseAdminHandlerWithUser } from "@/middleware";
import { Game, GameStatus } from "@/types/schema";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";

export type BodyParams = {
  game: string;
};

export type Response = {
  success: boolean;
};

export const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" &&
    typeof body.game === "string" &&
    Boolean(body.game)
  );
};

export const Handler: FirebaseAdminHandlerWithUser<Response> = async (
  context
) => {
  const { user, req, firestore, getCurrentGame } = context;

  if (!isBodyParams(req.body)) {
    throw new InvalidBodyParamsError();
  }

  const usersExistingGame = await getCurrentGame(user.uid);

  if (usersExistingGame?.id === req.body.game) {
    throw new ApiHandlerError({
      code: "permission-denied",
      message: "You are already in this game",
      status: 400,
    });
  }

  if (usersExistingGame !== null) {
    throw new ApiHandlerError({
      code: "permission-denied",
      message: "You are already in a game. Leave it before creating another.",
      status: 400,
    });
  }

  const gameDoc = await firestore.collection("games").doc(req.body.game).get();

  if (!gameDoc.exists) {
    throw new ApiHandlerError({
      code: "not-found",
      message: "There is no game with that id",
      status: 404,
    });
  }

  const game = gameDoc.data() as Game;

  if (game.status !== GameStatus.waiting) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "Game has already started or is over",
      status: 400,
    });
  }

  if (game.playerIds.length > 10) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "Game is full.",
      status: 400,
    });
  }

  await gameDoc.ref.update({
    playerIds: game.playerIds.concat(user.uid),
  });

  return { success: true };
};
