import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DialogProvider } from "@/components/dialog/DialogProvider";
import { useAuthListener } from "@/hooks/auth";
import { Navbar } from "@/components/navigation/Navbar";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/queries/queryClient";
import { Container } from "@mui/material";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();

  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <Navbar />
        <Container maxWidth={"md"}>
          <Component {...pageProps} />
        </Container>
      </DialogProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
