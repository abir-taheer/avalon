import { SimpleAccordion } from "@/components/accordion/SimpleAccordion";
import { PlayerListItem } from "@/components/game/PlayersList/PlayerListItem";
import { Player } from "@/types/schema";
import { List, Typography } from "@mui/material";
import { useAuth } from "@/hooks";

export type PlayersListProps = {
  gameId: string;
  playerIds: Player["id"][];
  ownerId?: Player["id"];
  initialState?: boolean;
};

export const PlayersList = ({
  gameId,
  playerIds,
  ownerId,
  initialState = true,
}: PlayersListProps) => {
  const { user } = useAuth();

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
        sx: { border: "1px solid rgba(0, 0, 0, 0.12)" },
      }}
    >
      <List>
        {playerIds.map((id) => (
          <PlayerListItem
            id={id}
            gameId={gameId}
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
