import { useGameQuery } from "@/queries/useGameQuery";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";
import { useMemo } from "react";
import {
  Button,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCurrentUserGameIdQuery } from "@/queries/useCurrentUserGameIdQuery";
import Link from "next/link";
import { LinkButton } from "@/components/button/LinkButton";

export type JoinGameButtonProps = {
  id: string;
};

export const JoinGameButton = ({ id }: JoinGameButtonProps) => {
  const { data, isLoading: loadingGame } = useGameQuery({ id });
  const { data: existingGame, isLoading: loadingExistingGame } =
    useCurrentUserGameIdQuery();
  const user = useAtomValue(userAtom);

  // Make sure both have loaded before displaying anything
  const isReady = useMemo(
    () => !loadingGame && !loadingExistingGame,
    [loadingGame, loadingExistingGame]
  );

  const isUserInGame = useMemo(
    () => (user ? data?.playerIds?.includes(user.uid) : false),
    [user, data]
  );

  const isUserInAnotherGame = useMemo(
    () => existingGame?.id && existingGame.id !== id,
    [existingGame, id]
  );

  const canUserJoin = useMemo(
    () => Boolean(user) && !isUserInGame && !isUserInAnotherGame,
    [user, isUserInGame, isUserInAnotherGame]
  );

  const helperText = useMemo(() => {
    if (!user) return "You must be logged in to join a game";
    if (isUserInGame) return "You are already in this game";
    if (isUserInAnotherGame)
      return `You are already in another game (${JSON.stringify(
        existingGame
      )})`;

    return "";
  }, [existingGame, user, isUserInGame, isUserInAnotherGame]);

  if (!isReady) {
    return <CircularProgress />;
  }

  return (
    <Stack>
      <Button disabled={!canUserJoin}>Join Game</Button>
      <Typography
        variant={"caption"}
        textAlign={"center"}
        color={!canUserJoin ? "error" : undefined}
      >
        {helperText}
      </Typography>
    </Stack>
  );
};
