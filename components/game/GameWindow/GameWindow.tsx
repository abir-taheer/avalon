import { Divider, Stack } from "@mui/material";
import { LeaveGameButton } from "@/components/game/LeaveGameButton";
import { JoinGameButton } from "@/components/game/JoinGameButton";
import { Game } from "@/types/schema";
import { useAuth } from "@/hooks";
import { useMemo } from "react";

export type GameWindowProps = {
  game: Game;
};

export const GameWindow = ({ game }: GameWindowProps) => {
  const { user } = useAuth();
  const playerInGame = useMemo(
    () => game && user && game.playerIds.includes(user.uid),
    [game, user]
  );

  return (
    <Stack spacing={2}>
      <pre>{JSON.stringify(game, null, 2)}</pre>

      <Divider />

      {playerInGame ? (
        <LeaveGameButton id={game.id} />
      ) : (
        <JoinGameButton id={game.id} />
      )}
    </Stack>
  );
};
