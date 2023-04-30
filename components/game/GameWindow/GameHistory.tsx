import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { SimpleAccordion } from "@/components/accordion/SimpleAccordion";
import { useGameContext } from "@/context/GameContext";
import { useRoundsQuery } from "@/queries/useRoundsQuery";
import { useMemo } from "react";
import { RoundVotingResults } from "@/components/game/Round/RoundVotingResults";

export const GameHistory = () => {
  const game = useGameContext();
  const { data } = useRoundsQuery({ game: game.id });

  const rounds = useMemo(
    () => data?.filter((round) => round.id !== game.currentRoundId),
    [data, game]
  );

  if (!rounds?.length) {
    return null;
  }

  return (
    <SimpleAccordion
      summary={"Game History"}
      // It will not load the information about the players until the user clicks on the accordion
      renderDetailsIfHidden={false}
      initialState={false}
      accordionProps={{
        sx: { border: "1px solid rgba(0, 0, 0, 0.12)" },
      }}
    >
      <List>
        {rounds.map((round) => (
          <SimpleAccordion
            key={round.id}
            summary={<Typography>Round {round.number}</Typography>}
            // It will not load the information about the players until the user clicks on the accordion
            renderDetailsIfHidden={false}
            initialState={false}
            accordionProps={{
              sx: { border: "1px solid rgba(0, 0, 0, 0.12)" },
            }}
          >
            <ListItem key={round.id}>
              <ListItemText primary={<RoundVotingResults round={round} />} />
            </ListItem>
          </SimpleAccordion>
        ))}
      </List>
    </SimpleAccordion>
  );
};
