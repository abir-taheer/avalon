import { DialogQueue } from "@/components/dialog/queue/DialogQueue";
import { Footer } from "@/components/navigation/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import { useAuthListener } from "@/hooks/auth";
import { queryClient } from "@/queries/queryClient";
import { ThemeProvider } from "@/theme";
import { withAppEmotionCache } from "@/utils/tss";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import { makeStyles } from "tss-react/mui";
import "../styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";

const useStyles = makeStyles()((theme) => ({
  ContentRoot: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  SuccessSnackbar: {
    backgroundColor: theme.palette.success.main,
  },
  BodyContainerWithFooter: {
    minHeight: "calc(100vh - 100px)",
    paddingBottom: 100,
    position: "relative",
  },
}));

function MyApp({ Component, pageProps }: AppProps) {
  useAuthListener();
  const { classes } = useStyles();

  return (
    <ThemeProvider>
      <div className={classes.BodyContainerWithFooter}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          classes={{ variantSuccess: classes.SuccessSnackbar }}
        >
          <QueryClientProvider client={queryClient}>
            <DialogQueue />
            <Navbar />
            <div className={classes.ContentRoot}>
              <Component {...pageProps} />
            </div>
            <Footer />
          </QueryClientProvider>
        </SnackbarProvider>
      </div>
    </ThemeProvider>
  );
}

export default withAppEmotionCache(MyApp);
