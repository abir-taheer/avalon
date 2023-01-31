import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";
import { FlexDiv } from "@/components/flex/FlexDiv";
import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";
import { CircleRounded } from "@mui/icons-material";
import {
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export type PlayerListItemProps = {
  id: string;
  isOwner?: boolean;
  itemProps?: ListItemProps;
};

export const PlayerListItem = ({
  id,
  isOwner,
  itemProps,
}: PlayerListItemProps) => {
  const { data, isLoading } = useRealtimeUserQuery({ id });

  // This is fine since it doesn't get rendered until data is loaded anyways
  const active = data?.active ?? false;

  if (isLoading) {
    return <LinearProgress variant={"indeterminate"} />;
  }

  // Very bizarre situation for sure
  // For simplicity's sake, we'll just not render anything
  if (!data) {
    return null;
  }

  return (
    <ListItem {...itemProps}>
      <ListItemAvatar>
        <OptimizedAvatar src={data.photoURL} width={48} height={48} />
      </ListItemAvatar>

      <FlexDiv
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <ListItemText
          primary={data.displayName}
          secondary={
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CircleRounded />
              <Typography variant={"body2"} component={"span"}>
                {data.active ? "online" : "offline"}
              </Typography>
            </Stack>
          }
        />

        {isOwner && <Typography variant={"body2"}>Game Owner</Typography>}
      </FlexDiv>
    </ListItem>
  );
};
