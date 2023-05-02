import { GameHistory } from "@/components/game/GameWindow/GameHistory";
import { GameWindow } from "@/components/game/GameWindow/GameWindow";
import { LeaveGameButton } from "@/components/game/LeaveGameButton";
import { PlayersList } from "@/components/game/PlayersList";
import { GameContext } from "@/context/GameContext";
import { useAuth } from "@/hooks";
import { usePathParams } from "@/hooks/next/usePathParams";
import { useIsMobile } from "@/hooks/ui";
import { useGameQuery } from "@/queries/useGameQuery";
import { CancelOutlined } from "@mui/icons-material";
import { CircularProgress, Container, Grid, Stack } from "@mui/material";
import { useMemo } from "react";
import { makeStyles } from "tss-react/mui";
import { ResetGameButton } from "@/components/game/ResetGameButton";

type ExpectedPathParams = {
  id: string;
};

const useStyles = makeStyles()((theme) => ({
  LeaveGameButton: {
    filter: "grayscale(100%)",
    ":hover": {
      filter: "unset",
    },
  },
}));

export default function GamePage() {
  const { id } = usePathParams<ExpectedPathParams>();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { classes } = useStyles();

  const { data: game, isLoading } = useGameQuery({
    id,
    query: { enabled: Boolean(id) },
  });

  const playerInGame = useMemo(
    () => game && user && game.playerIds.includes(user?.uid),
    [user, game]
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <GameContext.Provider value={game}>
      <Container maxWidth={"lg"}>
        <Grid container spacing={2} rowGap={4}>
          <Grid item md={7} xs={12}>
            <GameWindow />
          </Grid>

          <Grid item md={5} xs={12}>
            <Stack gap={2}>
              <PlayersList initialState={!isMobile} />

              {playerInGame && (
                <LeaveGameButton
                  className={classes.LeaveGameButton}
                  startIcon={<CancelOutlined />}
                  color={"error"}
                />
              )}

              {game.ownerId === user?.uid && <ResetGameButton id={game.id} />}
            </Stack>
          </Grid>
          <Grid item md={12} xs={12}>
            <GameHistory />
          </Grid>
        </Grid>
      </Container>
    </GameContext.Provider>
  );
}
