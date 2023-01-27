import { InvalidBodyParamsError } from "@/api-controllers/common-errors";
import { ApiHandlerError, FirebaseAdminHandlerWithUser } from "@/middleware";
import { Game } from "@/schema";

export type BodyParams = {
  id: string;
};

export type Response = {
  success: boolean;
};

const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" && typeof body.id === "string" && Boolean(body.id)
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

  const { id } = req.body;

  const gameDoc = await firestore.collection("games").doc(id).get();

  if (!gameDoc.exists) {
    throw new ApiHandlerError({
      code: "not-found",
      message: "Game not found",
      status: 404,
    });
  }

  const game = gameDoc.data() as Game;

  const isInGame = game.playerIds.some((id) => id === user.uid);

  if (!isInGame) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "You are not in this game",
      status: 400,
    });
  }

  const playerIds = game.playerIds.filter((id) => id !== user.uid);

  if (playerIds.length === 0) {
    await gameDoc.ref.delete();
  } else {
    // If the owner is leaving, set the next player as the owner
    const ownerId = game.ownerId === user.uid ? playerIds[0] : game.ownerId;

    // Remove the player from the game
    await gameDoc.ref.update({
      playerIds: game.playerIds.filter((id) => id !== user.uid),
      ownerId,
    });
  }

  return {
    success: true,
  };
};
