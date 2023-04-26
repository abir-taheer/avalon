import { FirebaseAdminHandlerWithUser } from "@/middleware";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import {
  Character,
  Game,
  GameStatus,
  isEvilCharacter,
  optionalCharacters,
} from "@/types/schema";
import { getMinimumNumberOfPlayersRequired } from "@/utils/game/getMinimumNumberOfPlayersRequired";
import { shuffleArray } from "@/utils/random/shuffleArray";
import { getNumEvilPlayers } from "@/utils/game/getNumEvilPlayers";

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

  const roles = game.playerIds.map((userId, index) => {
    let role: Character = enabledRoles[index];

    if (typeof role !== "undefined") {
      if (isEvilCharacter(role)) {
        numEvil++;
      }

      return {
        userId,
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
      userId,
      role,
    };
  });

  console.log(roles);

  return {
    success: false,
  };
};
