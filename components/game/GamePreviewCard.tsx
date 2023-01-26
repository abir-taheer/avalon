import { useGameQuery } from "@/queries/useGameQuery";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { PlayersList } from "@/components/game/PlayersList";
import { GameCardPreviewHeading } from "@/components/game/GameCardPreviewHeading";
import { GameCardPreviewFooter } from "@/components/game/GameCardPreviewFooter";

export type GamePreviewCardProps = {
  id: string;
};

export const GamePreviewCard = ({ id }: GamePreviewCardProps) => {
  const { data } = useGameQuery({ id });

  if (!data) {
    return null;
  }

  const { createdAt, playerIds, ownerId } = data;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const createdAtString = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
    hour12: true,
    timeZone,
  }).format(createdAt.toDate());

  return (
    <Card variant={"outlined"}>
      <CardContent>
        <Stack spacing={2}>
          <GameCardPreviewHeading id={id} />

          <Typography
            variant="subtitle2"
            color={"gray"}
            sx={{ marginBottom: 2 }}
          >
            created on {createdAtString}
          </Typography>

          <PlayersList playerIds={playerIds} ownerId={ownerId} />

          <GameCardPreviewFooter id={id} />
        </Stack>
      </CardContent>
    </Card>
  );
};
