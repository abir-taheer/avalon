import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DialogProvider } from "@/components/dialog/DialogProvider";
import { useAuthListener } from "@/hooks/auth";
import { Navbar } from "@/components/navigation/Navbar";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/queries/queryClient";
import { Container } from "@mui/material";
import { ThemeProvider } from "@/theme";

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DialogProvider>
          <Navbar />
          <Container
            maxWidth={"md"}
            style={{
              marginTop: "1rem",
            }}
          >
            <Component {...pageProps} />
          </Container>
        </DialogProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
