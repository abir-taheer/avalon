import { firestore } from "firebase-admin";
import { Game, GameStatus } from "@/types/schema";
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
  }

  if (numPasses >= 3) {
    newGameData.status = GameStatus.completed;
    newGameData.winner = "good";
  }

  if (newGameData.status) {
    await transaction.update(gameRef, newGameData);
  }
};
