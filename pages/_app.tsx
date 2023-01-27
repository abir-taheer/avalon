import { DialogQueue } from "@/components/dialog/queue/DialogQueue";
import { Navbar } from "@/components/navigation/Navbar";
import { useAuthListener } from "@/hooks/auth";
import { queryClient } from "@/queries/queryClient";
import { ThemeProvider } from "@/theme";
import { withAppEmotionCache } from "@/utils/tss";
import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import { makeStyles } from "tss-react/mui";
import "../styles/globals.css";

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
          <DialogQueue />
          <Navbar />
          <Container maxWidth={"md"} className={classes.ContentContainer}>
            <Component {...pageProps} />
          </Container>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default withAppEmotionCache(MyApp);
