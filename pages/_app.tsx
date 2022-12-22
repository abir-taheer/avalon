import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthListener } from "@/config";
import { useCurrentGameListener } from "@/atoms/current-game";

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();
  useCurrentGameListener();

  return <Component {...pageProps} />;
}

export default MyApp;
