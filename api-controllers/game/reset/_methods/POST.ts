import { FirebaseAdminHandlerWithUser } from "@/middleware";
import { Game, GameStatus, WaitingGame } from "@/types/schema";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";

export type BodyParams = {
  game: string;
};

export type Response = {
  game: Game;
};

export const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" &&
    typeof body.game === "string" &&
    Boolean(body.game)
  );
};

export const Handler: FirebaseAdminHandlerWithUser<Response> = async ({
  req,
  firestore,
  user,
}) => {
  if (!isBodyParams(req.body)) {
    throw new InvalidBodyParamsError();
  }

  const gameDoc = await firestore.collection("games").doc(req.body.game).get();

  if (!gameDoc.exists) {
    throw new ApiHandlerError({
      code: "not-found",
      message: "Game not found",
      status: 404,
    });
  }

  const game = gameDoc.data() as Game;
  const isGameOwner = game.ownerId === user.uid;

  if (!isGameOwner) {
    throw new ApiHandlerError({
      code: "permission-denied",
      message: "You cannot start if you are not the owner of this game",
      status: 403,
    });
  }

  const newGameData: WaitingGame = {
    ...game,
    notes: "",
    status: GameStatus.waiting,
    currentRoundId: null,
    winner: null,
    roundResults: [],
  };

  await gameDoc.ref.set(newGameData);

  await firestore.recursiveDelete(gameDoc.ref.collection("rounds"));
  await firestore.recursiveDelete(gameDoc.ref.collection("roles"));

  return {
    game,
  };
};
