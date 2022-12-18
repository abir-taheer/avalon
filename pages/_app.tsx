import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthListener } from "@/config";

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();
  return <Component {...pageProps} />;
}

export default MyApp;
