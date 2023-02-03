import { FirebaseAdminHandlerWithUser } from "@/middleware";
import { Game } from "@/types/schema";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";

export type BodyParams = {
  game: string;
  user: string;
};

export type Response = {
  success: boolean;
};

const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" &&
    typeof body.game === "string" &&
    Boolean(body.game) &&
    typeof body.user === "string" &&
    Boolean(body.user)
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

  const isInGame = game.playerIds.some((id) => id === user.uid);

  if (!isInGame) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "You are not in this game",
      status: 400,
    });
  }

  const isRemovingSelf = req.body.user === user.uid;
  const isGameOwner = game.ownerId === user.uid;

  if (!isRemovingSelf && !isGameOwner) {
    throw new ApiHandlerError({
      code: "permission-denied",
      message:
        "You cannot remove other users if you are not the owner of this game",
      status: 403,
    });
  }

  const targetUserIsInGame = game.playerIds.some((id) => id === req.body.user);

  if (!targetUserIsInGame) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "The user you are trying to remove is not in this game",
      status: 400,
    });
  }

  const playerIds = game.playerIds.filter((id) => id !== req.body.user);

  if (playerIds.length === 0) {
    await gameDoc.ref.delete();
  } else {
    // If the owner is leaving, set the next player as the owner
    const ownerId = game.ownerId === user.uid ? playerIds[0] : game.ownerId;

    // Remove the player from the game
    await gameDoc.ref.update({
      playerIds,
      ownerId,
    });
  }

  return {
    success: true,
  };
};
