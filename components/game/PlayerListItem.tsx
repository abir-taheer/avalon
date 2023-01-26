import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";
import {
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { CircleRounded } from "@mui/icons-material";
import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";
import { makeStyles } from "tss-react/mui";
import { FlexDiv } from "@/components/flex/FlexDiv";

export type PlayerListItemProps = {
  id: string;
  isOwner?: boolean;
  itemProps?: ListItemProps;
};

type UseStylesParams = {
  active: boolean;
};

const useStyles = makeStyles<UseStylesParams>()((theme, params) => ({
  OwnerLabel: {
    color: theme.palette.secondary.main,
    fontSize: 12,
  },
  PlayerTextLabel: {
    flexGrow: 1,
  },
  ActiveIndicator: {
    color: params.active
      ? theme.palette.success.main
      : theme.palette.error.main,
    fontSize: 12,
  },
  ActiveLabel: {
    color: params.active
      ? theme.palette.success.main
      : theme.palette.error.main,
    fontSize: 12,
  },
}));

export const PlayerListItem = ({
  id,
  isOwner,
  itemProps,
}: PlayerListItemProps) => {
  const { data, isLoading } = useRealtimeUserQuery({ id });

  // This is fine since it doesn't get rendered until data is loaded anyways
  const active = data?.active ?? false;

  const { classes } = useStyles({ active });

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
          className={classes.PlayerTextLabel}
          primary={data.displayName}
          secondary={
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CircleRounded className={classes.ActiveIndicator} />
              <Typography
                variant={"body2"}
                component={"span"}
                className={classes.ActiveLabel}
              >
                {data.active ? "online" : "offline"}
              </Typography>
            </Stack>
          }
        />

        {isOwner && (
          <Typography variant={"body2"} className={classes.OwnerLabel}>
            Game Owner
          </Typography>
        )}
      </FlexDiv>
    </ListItem>
  );
};
