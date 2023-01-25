import { ThemeProvider as Provider } from "@mui/material";
import { theme } from "@/theme";
import { ReactNode } from "react";

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <Provider theme={theme}>{children}</Provider>;
};
