import { useGameQuery } from "@/queries/useGameQuery";
import {
  Card,
  CardActions,
  CardContent,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { LinkButton } from "@/components/button/LinkButton";
import { PlayerListItem } from "@/components/game/PlayerListItem";
import { SimpleAccordion } from "@/components/accordion/SimpleAccordion";

export type GamePreviewCardProps = {
  id: string;
};

export const GamePreviewCard = ({ id }: GamePreviewCardProps) => {
  const { data } = useGameQuery({ id });

  if (!data) {
    return null;
  }

  return (
    <Card variant={"outlined"}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">
            Game <code>{data.id}</code>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data.status}
          </Typography>
          <Typography variant="body2">
            created at {data.createdAt.toDate().toString()}
          </Typography>

          <SimpleAccordion
            summary={`${data.playerIds.length} Players`}
            // It will not load the information about the players until the user clicks on the accordion
            renderDetailsIfHidden={false}
            initialState={true}
          >
            <List>
              {data.playerIds.map((id) => (
                <PlayerListItem id={id} />
              ))}
            </List>
          </SimpleAccordion>
        </Stack>
      </CardContent>
      <CardActions>
        <LinkButton href={"/game/" + id}>Go To Game</LinkButton>
      </CardActions>
    </Card>
  );
};
