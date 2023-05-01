import { dialogQueueAtom } from "@/atoms/dialogQueueAtom";
import { DialogProps } from "@mui/material";
import { useSetAtom } from "jotai";
import { FunctionComponent, useCallback } from "react";

export type CloseDialogFn<ReturnType> = (value: ReturnType | null) => void;

export type UseDialogComponentProps<PropType, ReturnType> = {
  closeDialog: CloseDialogFn<ReturnType>;
} & PropType;

export type DialogQueueItem<PropType, ReturnType> = {
  Component: UseDialogComponent<PropType, ReturnType>;
  props: PropType;
  closeDialog: (value: ReturnType) => void;
  dialogProps?: Partial<Omit<DialogProps, "open" | "onClose">>;
};

const usePushDialog = <PropType, ReturnType>() => {
  const setQueue = useSetAtom(dialogQueueAtom);

  return useCallback(
    (dialog: DialogQueueItem<PropType, ReturnType>) =>
      setQueue((queue) => [dialog].concat(queue)),
    [setQueue]
  );
};

const usePopDialog = () => {
  const setQueue = useSetAtom(dialogQueueAtom);

  return useCallback(() => setQueue((queue) => queue.slice(1)), [setQueue]);
};

export type UseDialogComponent<PropType, ReturnType> = FunctionComponent<
  UseDialogComponentProps<PropType, ReturnType>
>;

export type OpenDialogFn<PropType, ReturnType> = (
  props: PropType
) => Promise<ReturnType | null>;

export const useDialog = <PropType, ReturnType>(
  DialogComponent: UseDialogComponent<PropType, ReturnType>,
  dialogProps?: Partial<Omit<DialogProps, "open" | "onClose">>
) => {
  const pushDialog = usePushDialog<PropType, ReturnType>();
  const popDialog = usePopDialog();

  const openDialog: OpenDialogFn<PropType, ReturnType> = useCallback(
    (props: PropType) => {
      return new Promise((resolve) => {
        const closeDialog: CloseDialogFn<ReturnType> = (value) => {
          popDialog();
          resolve(value);
        };

        pushDialog({
          Component: DialogComponent,
          props,
          closeDialog,
          dialogProps,
        });
      });
    },
    [pushDialog, popDialog, DialogComponent, dialogProps]
  );

  return openDialog;
};
