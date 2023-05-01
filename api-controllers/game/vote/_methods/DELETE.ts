import { FirebaseAdminHandlerWithUser } from "@/middleware";
import { Game, GameStatus, Round, RoundStatus } from "@/types/schema";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";

export type BodyParams = {
  game: string;
  round: string;
};

export type Response = {};

export const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" &&
    typeof body.game === "string" &&
    Boolean(body.game) &&
    typeof body.round === "string" &&
    Boolean(body.round)
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

  const userInGame = game.playerIds.some((playerId) => playerId === user.uid);

  if (!userInGame) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "You must be in the game to vote for the round",
      status: 400,
    });
  }

  if (game.status !== GameStatus.started) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "You cannot vote for a game that is not in progress",
      status: 400,
    });
  }

  const roundDocRef = await gameDoc.ref
    .collection("rounds")
    .doc(req.body.round);

  const roundSnapshot = await roundDocRef.get();

  const round = roundSnapshot.data() as Round;

  if (round.status !== RoundStatus.voting) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "You cannot vote for a round that is not in voting status",
      status: 400,
    });
  }

  const votesCollection = roundDocRef.collection("votes");

  await firestore.runTransaction(async (t) => {
    const roundSnapshot = await t.get(roundDocRef);
    const round = roundSnapshot.data() as Round;
    const newVotedPlayerIds = Array.from(
      new Set(round.votedPlayerIds.filter((id) => id !== user.uid))
    );

    await t.delete(votesCollection.doc(user.uid));
    await t.update(roundDocRef, { votedPlayerIds: newVotedPlayerIds });
  });

  return {};
};
