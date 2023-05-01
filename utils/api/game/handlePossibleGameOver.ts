import { Game, GameStatus } from "@/types/schema";
import { firestore } from "firebase-admin";
import Transaction = firestore.Transaction;

export const handlePossibleGameOver = async (
  transaction: Transaction,
  gameRef: firestore.DocumentReference
) => {
  const gameSnap = await transaction.get(gameRef);
  const game = (await gameSnap.data()) as Game;

  const numPasses = game.roundResults.filter(Boolean).length;
  const numFails = game.roundResults.length - numPasses;

  const newGameData: Partial<Game> = {};

  if (numFails >= 3) {
    newGameData.status = GameStatus.completed;
    newGameData.winner = "evil";
    newGameData.currentRoundId = null;
  }

  if (numPasses >= 3) {
    // Check to see if there is an assassin in this game
    newGameData.currentRoundId = null;

    if (game.options.optionalCharacters.assassin) {
      newGameData.status = GameStatus.pending_assassin;
      newGameData.winner = null;
    } else {
      newGameData.status = GameStatus.completed;
      newGameData.winner = "good";
    }
  }

  if (newGameData.status) {
    await transaction.update(gameRef, newGameData);
  }
};
