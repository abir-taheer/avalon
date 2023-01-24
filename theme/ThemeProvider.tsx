import { ThemeProvider as Provider } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "@/theme/theme";

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <Provider theme={theme}>{children}</Provider>;
};
