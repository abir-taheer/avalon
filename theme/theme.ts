import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 1,
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#10ac84",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5f27cd",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "'Unbounded', cursive",
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1rem",
    },
  },
});
