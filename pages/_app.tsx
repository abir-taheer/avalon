import "../styles/globals.css";
import type { AppProps } from "next/app";
import { auth, useAuthListener } from "@/config";
import { DialogProvider } from "@/components/dialog/DialogProvider";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { updateProfile } from "firebase/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";
import { useSyncUserMetadata } from "@/hooks/useSyncUserMetadata";
import { useSyncUserPresence } from "@/hooks/useSyncUserPresence";

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();
  useSyncUserPresence();
  useSyncUserMetadata();

  const user = useAtomValue(userAtom);

  const rename = useCallback(() => {
    const name = window.prompt("What is your name?");
  }, []);

  return (
    <DialogProvider>
      <Button onClick={rename}>Rename yourself</Button>
      <p>Hi there {user?.displayName}</p>
      <Component {...pageProps} />
    </DialogProvider>
  );
}

export default MyApp;
