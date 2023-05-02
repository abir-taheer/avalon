import { SimpleAccordion } from "@/components/accordion/SimpleAccordion";
import { PlayerListItem } from "@/components/game/PlayersList/PlayerListItem";
import { useGameContext } from "@/context/GameContext";
import { useAuth } from "@/hooks";
import { List, Typography } from "@mui/material";

export type PlayersListProps = {
  initialState?: boolean;
};

export const PlayersList = ({ initialState = true }: PlayersListProps) => {
  const { user } = useAuth();
  const game = useGameContext();

  const { playerIds, ownerId } = game;

  return (
    <SimpleAccordion
      summary={
        <Typography>
          {playerIds.length} {playerIds.length > 1 ? "Players" : "Player"}
        </Typography>
      }
      // It will not load the information about the players until the user clicks on the accordion
      renderDetailsIfHidden={false}
      initialState={initialState}
      accordionProps={{
        sx: (theme) => ({
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
        }),
      }}
    >
      <List>
        {playerIds.map((id) => (
          <PlayerListItem
            id={id}
            key={id}
            itemProps={{ sx: { paddingLeft: 0 } }}
            isOwner={ownerId === id}
            showSettings={user?.uid === ownerId && user?.uid !== id}
          />
        ))}
      </List>
    </SimpleAccordion>
  );
};
