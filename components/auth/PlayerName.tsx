import { Typography, TypographyProps } from "@mui/material";
import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";

export type PlayerNameProps = {
  playerId: string;
} & Omit<TypographyProps, "children">;

export const PlayerName = ({ playerId, ...typography }: PlayerNameProps) => {
  const { data, isLoading } = useRealtimeUserQuery({ id: playerId });

  return (
    <Typography component={"span"} variant={"inherit"} {...typography}>
      {isLoading ? "Loading..." : data?.displayName ?? "Unknown Player"}
    </Typography>
  );
};
