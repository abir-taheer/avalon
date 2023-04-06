import { Divider, Stack } from "@mui/material";
import { LeaveGameButton } from "@/components/game/LeaveGameButton";
import { JoinGameButton } from "@/components/game/JoinGameButton";
import { Game } from "@/types/schema";
import { useAuth } from "@/hooks";
import { useMemo } from "react";
import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";
import { useNewGameForm } from "@/forms/NewGameForm/useNewGameForm";
import { OptionsPreview } from "@/components/game/GameWindow/OptionsPreview";

export type GameWindowProps = {
  game: Game;
};

export const GameWindow = ({ game }: GameWindowProps) => {
  const { user } = useAuth();

  const form = useNewGameForm({
    initialValues: game.options,
    onSubmit: () => {},
  });

  const playerInGame = useMemo(
    () => game && user && game.playerIds.includes(user.uid),
    [game, user]
  );

  return (
    <Stack spacing={2}>
      <OptionsPreview game={game} />

      <Divider />

      {playerInGame ? (
        <LeaveGameButton id={game.id} />
      ) : (
        <JoinGameButton id={game.id} />
      )}
    </Stack>
  );
};
