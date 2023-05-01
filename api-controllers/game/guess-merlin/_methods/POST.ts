import { FirebaseAdminHandlerWithUser } from "@/middleware";
import { Game, GameStatus, Role } from "@/types/schema";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";

export type BodyParams = {
  game: string;
  merlin: string;
};

export type Response = {
  game: Game;
};

export const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" &&
    typeof body.game === "string" &&
    typeof body.merlin === "string" &&
    Boolean(body.game) &&
    Boolean(body.merlin)
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

  if (game.status !== GameStatus.pending_assassin) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "Game is not in the pending_assassin state",
      status: 400,
    });
  }

  const userRoleSnap = await gameDoc.ref
    .collection("roles")
    .doc(user.uid)
    .get();
  const userRole = userRoleSnap.data() as Role;

  if (userRole.role !== "assassin") {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "You are not the assassin",
      status: 400,
    });
  }

  const merlinIdIsValid = game.playerIds.includes(req.body.merlin);

  if (!merlinIdIsValid) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "Merlin ID is not valid",
      status: 400,
    });
  }

  const merlinGuessRoleSnap = await gameDoc.ref
    .collection("roles")
    .doc(req.body.merlin)
    .get();

  const merlinGuessRole = merlinGuessRoleSnap.data() as Role;

  const newGameData: Partial<Game> = {};
  newGameData.status = GameStatus.completed;
  newGameData.currentRoundId = null;

  if (merlinGuessRole.role === "merlin") {
    newGameData.winner = "evil";
    newGameData.notes =
      "Merlin was assassinated and the servants of Mordred stole the victory";
  } else {
    newGameData.winner = "good";
  }

  await gameDoc.ref.update(newGameData);

  const newData = (await gameDoc.ref.get()).data() as Game;

  return {
    game: newData,
  };
};
