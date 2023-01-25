import { ReactNode, useMemo, useState } from "react";

export type DialogProviderProps = {
  children: ReactNode;
};

export type Dialog = {
  component: ReactNode;
};

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialogs] = useState<Dialog[]>([]);

  const currentDialog = useMemo(
    () => dialogs[dialogs.length - 1] ?? null,
    [dialogs]
  );

  return (
    <>
      {currentDialog}
      {children}
    </>
  );
};
