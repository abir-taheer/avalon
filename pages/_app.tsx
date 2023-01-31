import { DialogQueue } from "@/components/dialog/queue/DialogQueue";
import { Navbar } from "@/components/navigation/Navbar";
import { useAuthListener } from "@/hooks/auth";
import { queryClient } from "@/queries/queryClient";
import { ThemeProvider } from "@/theme";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <DialogQueue />
          <Navbar />
          <div>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
