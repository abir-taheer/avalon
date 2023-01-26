import { GameCardPreviewFooter } from "@/components/game/GameCardPreviewFooter";
import { GameCardPreviewHeading } from "@/components/game/GameCardPreviewHeading";
import { PlayersList } from "@/components/game/PlayersList";
import { useGameQuery } from "@/queries/useGameQuery";
import {
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  CreatedAt: {
    color: theme.palette.grey[500],
    marginBottom: theme.spacing(2),
    banana: "",
  },
}));

export type GamePreviewCardProps = {
  id: string;
};

export const GamePreviewCard = ({ id }: GamePreviewCardProps) => {
  const { classes } = useStyles();
  const { data } = useGameQuery({ id });

  if (!data) {
    return <LinearProgress variant={"indeterminate"} />;
  }

  const { createdAt, playerIds, ownerId } = data;

  const created = createdAt.toDate();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const createdAtString = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
    hour12: true,
    timeZone,
  }).format(created);

  return (
    <Card variant={"outlined"}>
      <CardContent>
        <Stack spacing={2}>
          <GameCardPreviewHeading id={id} />

          <Typography variant="subtitle2" className={classes.CreatedAt}>
            created on {createdAtString}
          </Typography>

          <PlayersList playerIds={playerIds} ownerId={ownerId} />

          <GameCardPreviewFooter id={id} />
        </Stack>
      </CardContent>
    </Card>
  );
};
