import { useGameQuery } from "@/queries/useGameQuery";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { LinkButton } from "@/components/button/LinkButton";

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
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.playerIds.length} Players
        </Typography>
        <Typography variant="h5" component="div">
          Game {data.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.status}
        </Typography>
        <Typography variant="body2">
          created at {data.createdAt.toDate().toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <LinkButton href={"/game/" + id}>Go To Game</LinkButton>
      </CardActions>
    </Card>
  );
};
