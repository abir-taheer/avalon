import { Player } from "@/schema";
import { SimpleAccordion } from "@/components/accordion/SimpleAccordion";
import { List, Typography } from "@mui/material";
import { PlayerListItem } from "@/components/game/PlayerListItem";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";

export type PlayersListProps = {
  playerIds: Player["id"][];
  ownerId?: Player["id"];
};

export const PlayersList = ({ playerIds, ownerId }: PlayersListProps) => {
  const user = useAtomValue(userAtom);

  return (
    <SimpleAccordion
      summary={
        <Typography>
          {playerIds.length} {playerIds.length > 1 ? "Players" : "Player"}
        </Typography>
      }
      // It will not load the information about the players until the user clicks on the accordion
      renderDetailsIfHidden={false}
      initialState={true}
      accordionProps={{
        sx: { border: "1px solid rgba(0, 0, 0, 0.12)" },
      }}
    >
      <List>
        {playerIds.map((id) => (
          <PlayerListItem
            id={id}
            key={id}
            itemProps={{ sx: { paddingLeft: 0 } }}
            isOwner={ownerId === user?.uid}
          />
        ))}
      </List>
    </SimpleAccordion>
  );
};
