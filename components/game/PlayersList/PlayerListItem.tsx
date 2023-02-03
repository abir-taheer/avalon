import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";
import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";
import {
  AutoAwesome,
  Block,
  CircleRounded,
  MoreVert,
} from "@mui/icons-material";
import {
  IconButton,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemProps,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useState } from "react";
import { useSimpleConfirmDialog } from "@/components/dialog/ui/SimpleConfirmDialog";
import { useRemovePlayerFromGameMutation } from "@/mutations/useRemovePlayerFromGameMutation";
import { useTransferOwnershipMutation } from "@/mutations/useTransferOwnershipMutation";

export type PlayerListItemProps = {
  id: string;
  gameId: string;
  isOwner?: boolean;
  itemProps?: ListItemProps;
  showSettings?: boolean;
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
  MenuItemText: {
    fontSize: 12,
    fontWeight: "lighter",
  },
}));

export const PlayerListItem = ({
  id,
  isOwner,
  gameId,
  itemProps,
  showSettings,
}: PlayerListItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data, isLoading } = useRealtimeUserQuery({ id });
  const { mutateAsync: removePlayerFromGame } =
    useRemovePlayerFromGameMutation();

  const { mutateAsync: makePlayerOwner } = useTransferOwnershipMutation();
  const askForConfirmation = useSimpleConfirmDialog();

  const closeMenu = () => setAnchorEl(null);

  const removePlayer = async () => {
    const confirmed = await askForConfirmation({
      title: "Remove player",
      message: `Are you sure you want to remove ${data?.displayName} from the game?`,
    });

    closeMenu();

    if (confirmed) {
      await removePlayerFromGame({ game: gameId, user: id });
    }
  };

  const promotePlayer = async () => {
    const confirmed = await askForConfirmation({
      title: "Promote player",
      message: `Are you sure you want to make ${data?.displayName} the game owner?`,
    });

    closeMenu();

    if (confirmed) {
      await makePlayerOwner({ game: gameId, user: id });
    }
  };

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

      <ListItemSecondaryAction>
        {isOwner && (
          <Typography variant={"body2"} className={classes.OwnerLabel}>
            Game Owner
          </Typography>
        )}

        {showSettings && (
          <>
            <IconButton onClick={(ev) => setAnchorEl(ev.currentTarget)}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem onClick={removePlayer}>
                <ListItemIcon>
                  <Block />
                </ListItemIcon>
                <ListItemText className={classes.MenuItemText}>
                  <Typography className={classes.MenuItemText}>
                    Remove From Game
                  </Typography>
                </ListItemText>
              </MenuItem>

              <MenuItem onClick={promotePlayer}>
                <ListItemIcon>
                  <AutoAwesome />
                </ListItemIcon>
                <ListItemText>
                  <Typography className={classes.MenuItemText}>
                    Make game owner
                  </Typography>
                </ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
