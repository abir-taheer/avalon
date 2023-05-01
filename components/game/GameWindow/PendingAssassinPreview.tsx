import { LinearProgress, Stack, Typography } from "@mui/material";
import { useRoleQuery } from "@/queries/useRoleQuery";
import { useGameContext } from "@/context/GameContext";
import { AssassinView } from "@/components/game/GameWindow/AssassinView";

export type PendingAssassinPreviewProps = {};
export const PendingAssassinPreview = ({}: PendingAssassinPreviewProps) => {
  const game = useGameContext();
  const { data: role, isLoading } = useRoleQuery({ game: game.id });

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack gap={4}>
      <Typography variant={"h4"} align={"center"}>
        Assassin is picking merlin
      </Typography>

      <Typography variant={"caption"} color={"grey"}>
        The good players are about to win but the assassin still has a chance to
        steal the victory if they can correctly identify merlin.
      </Typography>

      {role?.role === "assassin" && <AssassinView />}
    </Stack>
  );
};
