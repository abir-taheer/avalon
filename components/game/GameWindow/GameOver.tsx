import { RoundStepper } from "@/components/game/GameWindow/RoundStepper";
import { useGameContext } from "@/context/GameContext";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRoleQuery } from "@/queries/useRoleQuery";
import { isEvilCharacter } from "@/types/schema";
import { colors, LinearProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

export const GameOver = () => {
  const game = useGameContext();
  const { isSignedIn } = useAuth();

  const { data: role, isLoading } = useRoleQuery({
    game: game.id,
    skip: !isSignedIn,
  });

  const team = useMemo(() => {
    if (!role) {
      return null;
    }
    return isEvilCharacter(role.role) ? "evil" : "good";
  }, [role]);

  const isOnWinningTeam = useMemo(() => game.winner === team, [game, team]);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack gap={4}>
      <RoundStepper roundNumber={game.roundResults.length} />

      <Typography align={"center"} fontWeight={"bold"} variant={"h4"}>
        Game Over
      </Typography>

      {isOnWinningTeam ? (
        <Typography align={"center"} color={colors.green[500]}>
          Congrats, you won!
        </Typography>
      ) : (
        <Typography align={"center"} color={"error"}>
          Tough Luck!
        </Typography>
      )}

      {Boolean(game.notes) && (
        <Typography variant={"caption"} color={"grey"} align={"center"}>
          {game.notes}
        </Typography>
      )}

      {game.winner === "evil" ? (
        <Typography align={"center"}>
          The minions of Mordrid were too cunning
        </Typography>
      ) : (
        <Typography align={"center"}>The forces of good prevailed</Typography>
      )}

      <Typography></Typography>
    </Stack>
  );
};
