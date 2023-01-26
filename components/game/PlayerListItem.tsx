import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";
import {
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { CircleRounded } from "@mui/icons-material";
import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";
import styled from "@emotion/styled";

export type PlayerListItemProps = {
  id: string;
  isOwner?: boolean;
  itemProps?: ListItemProps;
};

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const PlayerListItem = ({
  id,
  isOwner,
  itemProps,
}: PlayerListItemProps) => {
  const { data, isLoading } = useRealtimeUserQuery({ id });

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  return (
    <ListItem {...itemProps}>
      <ListItemAvatar>
        <OptimizedAvatar src={data.photoURL} width={48} height={48} />
      </ListItemAvatar>

      <FlexDiv>
        <ListItemText
          sx={{ flexGrow: 1 }}
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

        {isOwner && (
          <Typography
            variant={"body2"}
            sx={{ fontSize: 12 }}
            color={"secondary"}
          >
            Game Owner
          </Typography>
        )}
      </FlexDiv>
    </ListItem>
  );
};
