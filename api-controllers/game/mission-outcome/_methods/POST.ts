import { FirebaseAdminHandlerWithUser } from "@/middleware";
import {
  Game,
  GameStatus,
  isEvilCharacter,
  Role,
  Round,
  RoundStatus,
} from "@/types/schema";
import { MissionOutcome } from "@/types/schema/MissionOutcome";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { handlePossibleGameOver } from "@/utils/api/game/handlePossibleGameOver";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";
import { getTeamMembersPerRound } from "@/utils/game/getTeamMembersPerRound";
import { shuffleArray } from "@/utils/random/shuffleArray";

export type BodyParams = {
  game: string;
  round: string;
  passed: boolean;
};

export type Response = {
  outcome: MissionOutcome;
};

export const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" &&
    typeof body.passed === "boolean" &&
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

  if (round.status !== RoundStatus.mission_pending) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "You cannot vote for a round that is not in voting status",
      status: 400,
    });
  }

  // Make sure that the player is in the current round teamIds
  const userIsOnMission = round.teamPlayerIds.includes(user.uid);

  if (!userIsOnMission) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message:
        "You cannot decide the outcome for a mission that you are not on",
      status: 400,
    });
  }

  const playerRoleRef = gameDoc.ref.collection("roles").doc(user.uid);

  const playerRoleSnapshot = await playerRoleRef.get();
  const playerRole = playerRoleSnapshot.data() as Role;

  if (!isEvilCharacter(playerRole.role) && !req.body.passed) {
    throw new ApiHandlerError({
      code: "invalid-argument",
      message: "If you are not an evil character, you cannot fail the mission",
      status: 400,
    });
  }

  const outcomeData: MissionOutcome = {
    playerId: user.uid,
    passed: req.body.passed,
  };

  const outcomeDocRef = await roundDocRef.collection("outcomes").doc(user.uid);
  await outcomeDocRef.set(outcomeData);

  // firebase transaction
  await firestore.runTransaction(async (transaction) => {
    const roundSnap = await transaction.get(roundDocRef);
    const round = roundSnap.data() as Round;

    const decidedMissionOutcomePlayerIds = Array.from(
      new Set([...round.decidedMissionOutcomePlayerIds, user.uid])
    );

    await transaction.update(roundDocRef, {
      decidedMissionOutcomePlayerIds,
    });
  });

  await firestore.runTransaction(async (transaction) => {
    const roundSnap = await transaction.get(roundDocRef);
    const round = roundSnap.data() as Round;

    if (
      round.decidedMissionOutcomePlayerIds.length !== round.teamPlayerIds.length
    ) {
      return;
    }
    // Everyone has voted, get the outcome of the round
    const outcomesSnap = await transaction.get(
      roundDocRef.collection("outcomes")
    );

    const outcomes = shuffleArray(
      outcomesSnap.docs
        .map((doc) => doc.data() as MissionOutcome)
        .map((o) => o.passed)
    );

    // Round passed if all players voted true
    const numFails = outcomes.filter((o) => !o).length;
    const needsTwoFails = round.number === 4 && game.playerIds.length >= 7;

    const passed = needsTwoFails ? numFails <= 1 : numFails === 0;

    const status = passed
      ? RoundStatus.mission_passed
      : RoundStatus.mission_failed;

    const newRoundData: Partial<Round> = {
      status,
      outcomes,
    };

    const roundResults = [...game.roundResults, passed];
    await transaction.update(roundDocRef, newRoundData);

    const newGameData: Partial<Game> = {
      roundResults,
    };

    await transaction.update(gameDoc.ref, newGameData);

    if (round.number < 5) {
      const nextLeaderId =
        game.playerIds[
          (game.playerIds.indexOf(round.leaderId) + 1) % game.playerIds.length
        ];

      const number = round.number + 1;

      const nextId = Number(round.id) + 1;

      const teamSize = getTeamMembersPerRound(game.playerIds.length)[
        number - 1
      ];

      const nextRoundData: Round = {
        outcomes: [],
        decidedMissionOutcomePlayerIds: [],
        createdAt: new Date(),
        gameId: game.id,
        teamPlayerIds: [],
        teamSize,
        votedPlayerIds: [],
        id: nextId.toString(),
        number,
        leaderId: nextLeaderId,
        previousRejections: 0,
        status: RoundStatus.team_selection,
      };

      await transaction.set(
        gameDoc.ref.collection("rounds").doc(nextRoundData.id),
        nextRoundData
      );

      await transaction.update(gameDoc.ref, {
        currentRoundId: nextRoundData.id,
      });
    }
  });

  await firestore.runTransaction(async (transaction) => {
    await handlePossibleGameOver(transaction, gameDoc.ref);
  });

  return {
    outcome: outcomeData,
  };
};
