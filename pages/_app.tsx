import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthListener } from "@/config";
import { RMWCProvider } from "@rmwc/provider";

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();

  return (
    <RMWCProvider>
      <Component {...pageProps} />
    </RMWCProvider>
  );
}

export default MyApp;
