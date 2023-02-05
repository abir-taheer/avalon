import { usePathParams } from "@/hooks/next/usePathParams";
import { useGameQuery } from "@/queries/useGameQuery";
import { Button, CircularProgress, Container, Grid } from "@mui/material";
import { PlayersList } from "@/components/game/PlayersList";
import { useIsMobile } from "@/hooks/ui";
import { GameWindow } from "@/components/game/GameWindow/GameWindow";

type ExpectedPathParams = {
  id: string;
};

export default function GamePage() {
  const { id } = usePathParams<ExpectedPathParams>();
  const isMobile = useIsMobile();

  const {
    data: game,
    isLoading,
    refetch,
  } = useGameQuery({
    id,
    query: { enabled: Boolean(id) },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={2}>
        <Grid item md={7} xs={12}>
          <GameWindow game={game} />
        </Grid>

        <Grid item md={5} xs={12}>
          <PlayersList
            gameId={game.id}
            playerIds={game.playerIds}
            ownerId={game.ownerId}
            initialState={!isMobile}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
