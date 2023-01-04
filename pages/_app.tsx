import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DialogProvider } from "@/components/dialog/DialogProvider";
import { useAtomValue } from "jotai";
import { authUserAtom } from "@/atoms";
import { useAuthListener } from "@/hooks/auth";

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();
  const user = useAtomValue(authUserAtom);

  return (
    <DialogProvider>
      <p>Hi there {user?.displayName}</p>
      <Component {...pageProps} />
    </DialogProvider>
  );
}

export default MyApp;
