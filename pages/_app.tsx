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
import { withAppEmotionCache } from "@/utils/tss";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  SuccessSnackbar: {
    backgroundColor: theme.palette.success.main,
  },
  ContentContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();
  const { classes } = useStyles();

  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        classes={{ variantSuccess: classes.SuccessSnackbar }}
      >
        <QueryClientProvider client={queryClient}>
          <DialogProvider>
            <Navbar />
            <Container maxWidth={"md"} className={classes.ContentContainer}>
              <Component {...pageProps} />
            </Container>
          </DialogProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default withAppEmotionCache(MyApp);
