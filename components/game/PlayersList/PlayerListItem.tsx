import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";
import { useSimpleConfirmDialog } from "@/components/dialog/ui/SimpleConfirmDialog";
import { useGameContext } from "@/context/GameContext";
import { useRemovePlayerFromGameMutation } from "@/mutations/useRemovePlayerFromGameMutation";
import { useTransferOwnershipMutation } from "@/mutations/useTransferOwnershipMutation";
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
import { useState } from "react";
import { makeStyles } from "tss-react/mui";

export type PlayerListItemProps = {
  id: string;
  isOwner?: boolean;
  itemProps?: ListItemProps;
  showSettings?: boolean;
  isLeader?: boolean;
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
  itemProps,
  showSettings,
  isLeader,
}: PlayerListItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data, isLoading } = useRealtimeUserQuery({ id });
  const { mutateAsync: removePlayerFromGame } =
    useRemovePlayerFromGameMutation();
  const game = useGameContext();

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
      await removePlayerFromGame({ game: game.id, user: id });
    }
  };

  const promotePlayer = async () => {
    const confirmed = await askForConfirmation({
      title: "Promote player",
      message: `Are you sure you want to make ${data?.displayName} the game owner?`,
    });

    closeMenu();

    if (confirmed) {
      await makePlayerOwner({ game: game.id, user: id });
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
    <ListItem
      {...itemProps}
      sx={(theme) =>
        isLeader
          ? {
              border: "1px solid " + theme.palette.primary.main,
              marginTop: 1,
              marginBottom: 2,
              borderRadius: 4,
            }
          : {}
      }
    >
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
