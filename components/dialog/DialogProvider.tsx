import { ReactNode, useCallback, useMemo, useState } from "react";

export type DialogProviderProps = {
  children: ReactNode;
};

export type Dialog = {
  component: ReactNode;
};

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const currentDialog = useMemo(
    () => dialogs[dialogs.length - 1] ?? null,
    [dialogs]
  );

  const closeDialog = useCallback(() => {
    setDialogs((dialogs) => dialogs.slice(0, -1));
  }, [setDialogs]);

  return (
    <>
      {currentDialog}
      {children}
    </>
  );
};
