import { FirebaseAdminHandlerWithUser } from "@/middleware";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import {
  Character,
  Game,
  GameStatus,
  isEvilCharacter,
  optionalCharacters,
  Round,
  RoundStatus,
} from "@/types/schema";
import { getMinimumNumberOfPlayersRequired } from "@/utils/game/getMinimumNumberOfPlayersRequired";
import { shuffleArray } from "@/utils/random/shuffleArray";
import { getNumEvilPlayers } from "@/utils/game/getNumEvilPlayers";
import {
  generatePlayerContext,
  Role,
} from "@/utils/game/generatePlayerContext";

export type BodyParams = {
  game: string;
};

export type Response = {
  round: Round;
};

export const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" &&
    typeof body.game === "string" &&
    Boolean(body.game)
  );
};

/*
  Things that need to happen
  * Make sure that the user making the request is the person who is the owner of the game
  * Make sure that the game state is in pending
  * Make sure that there are enough players in that game to start

  Steps when starting a game
   * Calculate everyone's roles based on the options given for the game
   * Set everyone's roles as well as information relevant to their role
     (other evil people for merlin) at /game/:id/roles/:uid
   * Set the game state to in-progress
   * Create an object in the collection of rounds for the game in /games/:id/rounds/:roundId


 */
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

  if (game.status !== GameStatus.waiting) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "Game is not in the waiting state",
      status: 400,
    });
  }

  const numPlayersRequired = getMinimumNumberOfPlayersRequired(game.options);

  if (game.playerIds.length < numPlayersRequired) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "Not enough players to start the game",
      status: 400,
    });
  }

  // We've passed all the verification stages now we can actually start to give roles to people
  const randomPlayerIds = shuffleArray(game.playerIds);
  const numEvilPlayersRequired = getNumEvilPlayers(game.options);

  const enabledRoles = optionalCharacters.filter(
    (character) => game.options.optionalCharacters[character]
  );

  let numEvil = 0;

  const roles: Role[] = game.playerIds.map((playerId, index) => {
    let role: Character = enabledRoles[index];

    if (typeof role !== "undefined") {
      if (isEvilCharacter(role)) {
        numEvil++;
      }

      return {
        playerId,
        role,
      };
    }

    if (numEvil < numEvilPlayersRequired) {
      numEvil++;
      role = "minion";
    } else {
      role = "knight";
    }

    return {
      playerId,
      role,
    };
  });

  // Remember to shuffle them again soon

  // The O(n) complexity of this is not ideal but for such a small situation we don't care
  // Simplicity is more important here
  for (let i = 0; i < roles.length; i++) {
    const { playerId, role } = roles[i];

    const otherRoles = roles.filter((row) => row.playerId !== playerId);

    await firestore
      .collection("games")
      .doc(game.id)
      .collection("roles")
      .doc(playerId)
      .set({
        role,
        context: generatePlayerContext(role, otherRoles),
      });
  }

  const gameOrder = shuffleArray(game.playerIds);

  await gameDoc.ref.update({
    playerIds: gameOrder,
  });

  const roundData: Round = {
    id: "1",
    number: 1,
    leaderId: gameOrder[0],
    status: RoundStatus.team_selection,
    teamPlayerIds: [],
    votedPlayerIds: [],
    previousFails: 0,
    createdAt: new Date(),
  };

  await firestore
    .collection("games")
    .doc(game.id)
    .collection("rounds")
    .doc("1")
    .set(roundData);

  await gameDoc.ref.update({
    status: GameStatus.started,
  });

  return {
    round: roundData,
  };
};
