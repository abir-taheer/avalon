import { atom, useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config";
import { userAtom } from "./user";
import { Game } from "@/schema";

export const currentGameIdAtom = atom<string | null>(null);

export const currentGameAtom = atom<Game | null>(null);

export const getGame = async (gameId: string) => {
  const docRef = doc(db, "games", gameId);
  const game = await getDoc(docRef);

  if (game.exists()) {
    return game.data() as Game;
  }

  return null;
};

const getActiveGame = async (userId: string) => {
  const gamesRef = collection(db, "games");

  const games = await getDocs(
    query(
      gamesRef,
      where("active", "==", true),
      where("playerIds", "array-contains", userId)
    )
  );

  if (games.size > 0) {
    return games.docs[0].data() as Game;
  }

  return null;
};

export const useCurrentGameListener = () => {
  const [currentGameId, setCurrentGameId] = useAtom(currentGameIdAtom);
  const [currentGame, setCurrentGame] = useAtom(currentGameAtom);
  const user = useAtomValue(userAtom);

  const gameIdRef = useMemo(() => {
    if (!currentGameId) {
      return null;
    }

    return doc(db, "games", currentGameId);
  }, [currentGameId]);

  // when the user changes, check for an active game
  useEffect(() => {
    if (user) {
      getActiveGame(user.uid).then((activeGame) => {
        if (activeGame) {
          setCurrentGame(activeGame);
          setCurrentGameId(activeGame.id);
        }
      });
    } else {
      setCurrentGameId(null);
    }
  }, [user, setCurrentGameId, setCurrentGame]);

  useEffect(() => {
    if (currentGameId && currentGame?.id !== currentGameId) {
      getGame(currentGameId).then(setCurrentGame);
    }
  }, [currentGame, currentGameId, setCurrentGame]);

  // set up a snapshot and listen for live updates to the current game
  useEffect(() => {
    if (!gameIdRef) {
      return;
    }
    const unsubscribe = onSnapshot(gameIdRef, async (doc) => {
      setCurrentGame(doc.data() as Game);
    });

    return unsubscribe;
  }, [gameIdRef, setCurrentGame]);
};
