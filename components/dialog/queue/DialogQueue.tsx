import { dialogQueueAtom } from "@/atoms/dialogQueueAtom";
import { Dialog } from "@mui/material";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

export const DialogQueue = () => {
  const dialogs = useAtomValue(dialogQueueAtom);

  const CurrentDialog = useMemo(() => dialogs[0] ?? null, [dialogs]);

  if (CurrentDialog) {
    return (
      <Dialog
        open
        onClose={() => CurrentDialog.closeDialog(null)}
        {...CurrentDialog.dialogProps}
      >
        <CurrentDialog.Component
          {...CurrentDialog.props}
          closeDialog={CurrentDialog.closeDialog}
        />
      </Dialog>
    );
  }

  return null;
};
