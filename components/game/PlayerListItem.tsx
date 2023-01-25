import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";
import {
  Avatar,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { CircleRounded } from "@mui/icons-material";
import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";

export type PlayerListItemProps = {
  id: string;
};

export const PlayerListItem = ({ id }: PlayerListItemProps) => {
  const { data, isLoading } = useRealtimeUserQuery({ id });

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <OptimizedAvatar src={data.photoURL} width={48} height={48} />
      </ListItemAvatar>

      <ListItemText
        primary={data.displayName}
        secondary={
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleRounded
              style={{
                color: data.active ? "#27ae60" : "#e74c3c",
                fontSize: 12,
              }}
            />
            <Typography
              variant={"body2"}
              component={"span"}
              sx={{ fontSize: 12 }}
            >
              {data.active ? "online" : "offline"}
            </Typography>
          </Stack>
        }
      />
    </ListItem>
  );
};
