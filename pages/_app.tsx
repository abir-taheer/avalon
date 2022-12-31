import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthListener } from "@/config";
import { useCurrentGameListener } from "@/atoms/current-game";
import { DialogProvider } from "@/components/dialog/DialogProvider";

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();
  useCurrentGameListener();

  return (
    <DialogProvider>
      <Component {...pageProps} />
    </DialogProvider>
  );
}

export default MyApp;
