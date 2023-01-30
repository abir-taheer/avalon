import { JoinGameButton } from "@/components/game/JoinGameButton";
import { LeaveGameButton } from "@/components/game/LeaveGameButton";
import { usePathParams } from "@/hooks/next/usePathParams";
import { useGameQuery } from "@/queries/useGameQuery";
import { Button, CircularProgress, Container, Grid } from "@mui/material";
import { PlayersList } from "@/components/game/PlayersList";

type ExpectedPathParams = {
  id: string;
};

export default function GamePage() {
  const { id } = usePathParams<ExpectedPathParams>();

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
      <Button onClick={() => refetch()}>refetch</Button>

      <Grid container>
        <Grid item xs={7}></Grid>
        <Grid item xs={5}>
          <PlayersList playerIds={game.playerIds} ownerId={game.ownerId} />
        </Grid>
      </Grid>
      <JoinGameButton id={id} />
      <LeaveGameButton id={id} />
    </Container>
  );
}
