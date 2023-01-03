import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DialogProvider } from "@/components/dialog/DialogProvider";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";

function MyApp({ Component, pageProps }: AppProps) {
  const user = useAtomValue(userAtom);

  return (
    <DialogProvider>
      <p>Hi there {user?.displayName}</p>
      <Component {...pageProps} />
    </DialogProvider>
  );
}

export default MyApp;
