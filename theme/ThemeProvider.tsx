import { theme } from "@/theme";
import { ThemeProvider as Provider } from "@mui/material";
import { ReactNode, useEffect, useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { darkModeAtom } from "@/atoms/darkModeAtom";

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const darkMode = useAtomValue(darkModeAtom);
  const setDarkMode = useSetAtom(darkModeAtom);
  const themeVal = useMemo(() => theme(darkMode), [darkMode]);
  // add a listener for when the user toggles dark mode in their browser
  // and update the theme accordingly
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setDarkMode]);

  return <Provider theme={themeVal}>{children}</Provider>;
};
