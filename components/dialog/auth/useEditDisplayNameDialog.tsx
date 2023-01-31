import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { FormEventHandler, useState } from "react";
import { makeStyles } from "tss-react/mui";

export type EditDisplayNameDialogProps = {
  initialValue?: string;
};
export type EditDisplayNameDialogOnCloseReturnType = {
  displayName: string;
};

const useStyles = makeStyles()((theme) => ({
  Root: {
    padding: theme.spacing(2),
  },
  Content: {
    padding: 0,
  },
  NameInput: {
    marginTop: theme.spacing(2),
  },
}));

export const EditDisplayNameDialog: UseDialogComponent<
  EditDisplayNameDialogProps,
  EditDisplayNameDialogOnCloseReturnType
> = ({ closeDialog, initialValue }) => {
  const { classes } = useStyles();
  const [displayName, setDisplayName] = useState(initialValue ?? "");

  const submit = () => {
    closeDialog({ displayName });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    if (!displayName) {
      return ev.preventDefault();
    }

    submit();
  };

  return (
    <Stack
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      className={classes.Root}
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent className={classes.Content}>
        <form onSubmit={onSubmit}>
          <TextField
            value={displayName}
            onChange={(ev) => setDisplayName(ev.target.value)}
            fullWidth
            variant={"outlined"}
            label={"Display Name"}
            autoComplete={"name"}
            className={classes.NameInput}
          />
        </form>
      </DialogContent>

      <Divider />
      <Button
        disabled={!displayName}
        onClick={submit}
        variant={"contained"}
        fullWidth
      >
        Save
      </Button>
      <Button
        onClick={() => closeDialog(null)}
        variant={"outlined"}
        fullWidth
        color={"secondary"}
      >
        Cancel
      </Button>
    </Stack>
  );
};

export const useEditDisplayNameDialog = () => {
  return useDialog<
    EditDisplayNameDialogProps,
    EditDisplayNameDialogOnCloseReturnType
  >(EditDisplayNameDialog);
};
