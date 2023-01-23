import {
  ApiHandlerError,
  FirebaseAdminHandlerWithUser,
  withAuth,
} from "@/middleware";
import { Game, GameStatus } from "@/schema";

export type POST_JoinGameBody = {
  gameId: string;
};

export type DELETE_JoinGameBody = {
  gameId: string;
};

const POST_JoinGame: FirebaseAdminHandlerWithUser = async (context) => {
  const { user, req, firestore, getCurrentGame } = context;

  const { gameId } = req.body;

  if (!gameId) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "gameId is required",
      status: 400,
    });
  }

  const usersExistingGame = await getCurrentGame(user.uid);

  if (usersExistingGame?.id === gameId) {
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

  const gameDoc = await firestore.collection("games").doc(gameId).get();

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

export default withAuth(async (context) => {
  const { req } = context;

  if (req.method === "POST") {
    POST_JoinGame(context);
  }

  throw new ApiHandlerError({
    code: "unimplemented",
    message: "This method is not implemented",
    status: 405,
  });
});
