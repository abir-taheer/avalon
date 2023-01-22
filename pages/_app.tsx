import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DialogProvider } from "@/components/dialog/DialogProvider";
import { useAuthListener } from "@/hooks/auth";
import { Navbar } from "@/components/navigation/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { queryClient } from "@/queries/queryClient";
import { useCurrentUserGameId } from "@/queries/useCurrentUserGame";

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();

  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <Navbar />
        <Component {...pageProps} />
      </DialogProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
