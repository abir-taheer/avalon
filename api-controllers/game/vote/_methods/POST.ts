import { FirebaseAdminHandlerWithUser } from "@/middleware";
import { InvalidBodyParamsError } from "@/utils/api/InvalidBodyParamsError";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { Game, GameStatus, Round, RoundStatus, Vote } from "@/types/schema";
import { getTeamMembersPerRound } from "@/utils/game/getTeamMembersPerRound";

export type BodyParams = {
  game: string;
  round: string;
  approval: boolean;
};

export type Response = {
  vote: Vote;
};

export const isBodyParams = (body: any): body is BodyParams => {
  return (
    typeof body === "object" &&
    typeof body.approval === "boolean" &&
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

  const voteData = {
    playerId: user.uid,
    approval: req.body.approval,
  };

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

  await votesCollection.doc(user.uid).set(voteData);

  await firestore.runTransaction(async (t) => {
    const roundSnapshot = await t.get(roundDocRef);
    const round = roundSnapshot.data() as Round;
    const newVotedPlayerIds = Array.from(
      new Set([...round.votedPlayerIds, user.uid])
    );
    await t.update(roundDocRef, { votedPlayerIds: newVotedPlayerIds });

    const numVotes = newVotedPlayerIds.length;

    if (numVotes === game.playerIds.length) {
      const allVotesSnapshot = await votesCollection.get();

      const allVotes = allVotesSnapshot.docs.map((doc) => doc.data() as Vote);

      const numApprovals = allVotes.filter((vote) => vote.approval).length;

      const teamApproved = numApprovals > game.playerIds.length / 2;

      if (teamApproved) {
        // the team was approved
        await t.update(roundDocRef, { status: RoundStatus.mission_pending });
        return;
      }

      const autoFail = round.previousRejections === 4;

      let previousRejections = (round.previousRejections + 1) % 5;

      let number = round.number;

      if (autoFail) {
        await t.update(roundDocRef, {
          status: RoundStatus.mission_failed,
          notes:
            "The round was automatically failed since the team selection was rejected 5 times",
        });

        const roundResults = [...game.roundResults, false];

        await t.update(gameDoc.ref, {
          roundResults,
        });

        number++;
      } else {
        await t.update(roundDocRef, { status: RoundStatus.team_rejected });
      }

      const nextLeaderId =
        game.playerIds[
          (game.playerIds.indexOf(round.leaderId) + 1) % game.playerIds.length
        ];

      const nextId = Number(round.id) + 1;

      const teamSize = getTeamMembersPerRound(game.playerIds.length)[
        number - 1
      ];

      const newRoundData: Round = {
        createdAt: new Date(),
        gameId: game.id,
        teamPlayerIds: [],
        teamSize,
        votedPlayerIds: [],
        id: nextId.toString(),
        number,
        leaderId: nextLeaderId,
        previousRejections,
        status: RoundStatus.team_selection,
      };

      await t.set(
        gameDoc.ref.collection("rounds").doc(newRoundData.id),
        newRoundData
      );

      await t.update(gameDoc.ref, {
        currentRoundId: newRoundData.id,
      });
    }
  });

  return {
    vote: voteData,
  };
};
