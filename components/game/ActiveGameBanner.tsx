import { userAtom } from "@/atoms";
import { LinkButton } from "@/components/button/LinkButton";
import { GamePreviewCard } from "@/components/game/GamePreviewCard";
import { useCurrentUserGameIdQuery } from "@/queries/useCurrentUserGameIdQuery";
import { Add } from "@mui/icons-material";
import {
  CircularProgress,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "@/hooks";

export const ActiveGameBanner = () => {
  const { user } = useAuth();

  // Only bother with loading it if the user is signed in
  const { data, isLoading } = useCurrentUserGameIdQuery({
    query: {
      enabled: Boolean(user),
    },
  });

  if (isLoading) {
    return <LinearProgress variant={"indeterminate"} />;
  }

  return (
    <Stack spacing={4}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>My current game:</Typography>

        <LinkButton
          href={`/game/new`}
          variant={"contained"}
          startIcon={<Add />}
        >
          Create Game
        </LinkButton>
      </Stack>

      {isLoading && <CircularProgress />}

      {/* I hate using '!!' but typescript is being annoying and wrapping in 'Boolean()' doesn't work*/}
      {typeof data?.id === "string" ? (
        <GamePreviewCard id={data.id} />
      ) : (
        <Typography color={"gray"}>
          You're not in a game at the moment
        </Typography>
      )}
    </Stack>
  );
};
