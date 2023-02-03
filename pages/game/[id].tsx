import { JoinGameButton } from "@/components/game/JoinGameButton";
import { LeaveGameButton } from "@/components/game/LeaveGameButton";
import { usePathParams } from "@/hooks/next/usePathParams";
import { useGameQuery } from "@/queries/useGameQuery";
import { Button, CircularProgress, Container, Grid } from "@mui/material";
import { PlayersList } from "@/components/game/PlayersList";
import { useMemo } from "react";
import { useAuth } from "@/hooks";

type ExpectedPathParams = {
  id: string;
};

export default function GamePage() {
  const { id } = usePathParams<ExpectedPathParams>();
  const { user } = useAuth();
  const {
    data: game,
    isLoading,
    refetch,
  } = useGameQuery({
    id,
    query: { enabled: Boolean(id) },
  });

  const playerInGame = useMemo(
    () => game && user && game.playerIds.includes(user.uid),
    [game, user]
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <Container maxWidth={"lg"}>
      <Button onClick={() => refetch()}>refetch</Button>

      <Grid container>
        <Grid item xs={7}>
          <pre>{JSON.stringify(game, null, 2)}</pre>
        </Grid>
        <Grid item xs={5}>
          <PlayersList
            gameId={game.id}
            playerIds={game.playerIds}
            ownerId={game.ownerId}
          />
          {playerInGame ? (
            <LeaveGameButton id={id} />
          ) : (
            <JoinGameButton id={id} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
