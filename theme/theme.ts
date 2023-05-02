import { colors, createTheme } from "@mui/material";

export const theme = (dark: boolean) =>
  createTheme({
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
      mode: dark ? "dark" : "light",
      primary: {
        main: "#2e86de",
      },
      secondary: {
        main: "#5758BB",
      },
      error: {
        light: colors.red[300],
        main: colors.red[500],
        dark: colors.red[700],
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
