import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: 1,
        },
      },
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
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});
