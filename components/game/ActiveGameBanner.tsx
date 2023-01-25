import { useCurrentUserGameIdQuery } from "@/queries/useCurrentUserGameIdQuery";
import { CircularProgress, Typography } from "@mui/material";
import { GamePreviewCard } from "@/components/game/GamePreviewCard";

export const ActiveGameBanner = () => {
  const { data, isLoading } = useCurrentUserGameIdQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data || !data.id) {
    return null;
  }

  return (
    <>
      <Typography>Your current game</Typography>

      <GamePreviewCard id={data.id} />
    </>
  );
};
