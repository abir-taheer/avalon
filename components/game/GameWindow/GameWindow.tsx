import { Divider, Stack } from "@mui/material";
import { LeaveGameButton } from "@/components/game/LeaveGameButton";
import { JoinGameButton } from "@/components/game/JoinGameButton";
import { Game } from "@/types/schema";
import { useAuth } from "@/hooks";
import { useMemo } from "react";
import { useNewGameForm } from "@/forms/NewGameForm/useNewGameForm";
import { OptionsPreview } from "@/components/game/GameWindow/OptionsPreview";
import { CancelOutlined, PersonAddOutlined } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";

export type GameWindowProps = {
  game: Game;
};

const useStyles = makeStyles()({
  LeaveGameButton: {
    filter: "grayscale(100%)",
    ":hover": {
      filter: "unset",
    },
  },
});

export const GameWindow = ({ game }: GameWindowProps) => {
  const { user } = useAuth();
  const { classes } = useStyles();

  const form = useNewGameForm({
    initialValues: game.options,
    onSubmit: () => {},
  });

  const playerInGame = useMemo(
    () => game && user && game.playerIds.includes(user.uid),
    [game, user]
  );

  return (
    <Stack spacing={2}>
      <OptionsPreview game={game} />

      <Divider />

      {playerInGame ? (
        <LeaveGameButton
          id={game.id}
          className={classes.LeaveGameButton}
          startIcon={<CancelOutlined />}
          color={"error"}
        />
      ) : (
        <JoinGameButton id={game.id} startIcon={<PersonAddOutlined />} />
      )}
    </Stack>
  );
};
