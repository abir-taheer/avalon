import { Game } from "@/types/schema";
import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { Button, Stack } from "@mui/material";

export type GameplayProps = {
  game: Game;
};
export const Gameplay = ({ game }: GameplayProps) => {
  const openRoleDialog = useRoleDialog();

  return (
    <Stack>
      <div>
        <Button onClick={() => openRoleDialog({ game })} variant={"outlined"}>
          Show your role
        </Button>
      </div>
    </Stack>
  );
};
