import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DialogProvider } from "@/components/dialog/DialogProvider";
import { useAuthListener } from "@/hooks/auth";
import { Navbar } from "@/components/navigation/Navbar";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/queries/queryClient";
import { Container } from "@mui/material";
import { ThemeProvider } from "@/theme";
import { SnackbarProvider } from "notistack";
import { makeStyles, withAppEmotionCache } from "@/utils/tss";

const useStyles = makeStyles((theme) => ({
  snackbarSuccess: {
    backgroundColor: theme.palette.success.main,
  },
}));

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();
  const { classes } = useStyles();

  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        classes={{
          variantSuccess: classes.snackbarSuccess,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <DialogProvider>
            <Navbar />
            <Container
              maxWidth={"md"}
              sx={(theme) => ({
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
              })}
            >
              <Component {...pageProps} />
            </Container>
          </DialogProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default withAppEmotionCache(MyApp);
