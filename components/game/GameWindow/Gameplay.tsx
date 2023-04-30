import { Round } from "@/types/schema";
import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { Button, Stack } from "@mui/material";
import { RoundPreview } from "@/components/game/Round/RoundPreview";
import { useEffect, useMemo, useState } from "react";
import { useGameContext } from "@/context/GameContext";

export type GameplayProps = {
  rounds: Round[];
};

export const Gameplay = ({ rounds }: GameplayProps) => {
  const openRoleDialog = useRoleDialog();
  const [roundIndex, setRoundIndex] = useState(rounds.length - 1);
  const lastRound = useMemo(() => rounds[rounds.length - 1], [rounds]);
  const game = useGameContext();

  useEffect(() => {
    setRoundIndex(rounds.length - 1);
  }, [lastRound, rounds.length]);

  const round = rounds[roundIndex];

  return (
    <Stack>
      <div>
        <Button onClick={() => openRoleDialog({ game })} variant={"outlined"}>
          Show your role
        </Button>
      </div>

      {round && <RoundPreview game={game} round={round} />}
    </Stack>
  );
};
