import { JoinGameButton } from "@/components/game/JoinGameButton";
import { usePathParams } from "@/hooks/next/usePathParams";
import { useGameQuery } from "@/queries/useGameQuery";
import { Button, CircularProgress } from "@mui/material";

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
    <>
      <Button onClick={() => refetch()}>refetch</Button>
      <pre>{JSON.stringify(game, null, 2)}</pre>

      <JoinGameButton id={id} />
    </>
  );
}
