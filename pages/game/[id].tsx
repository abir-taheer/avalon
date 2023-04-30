import { usePathParams } from "@/hooks/next/usePathParams";
import { useGameQuery } from "@/queries/useGameQuery";
import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { PlayersList } from "@/components/game/PlayersList";
import { useIsMobile } from "@/hooks/ui";
import { GameWindow } from "@/components/game/GameWindow/GameWindow";
import { LeaveGameButton } from "@/components/game/LeaveGameButton";
import { CancelOutlined } from "@mui/icons-material";
import { useMemo } from "react";
import { useAuth } from "@/hooks";
import { makeStyles } from "tss-react/mui";
import { GameContext } from "@/context/GameContext";
import { GameHistory } from "@/components/game/GameWindow/GameHistory";

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
