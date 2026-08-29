"use client";

import { LigthTheme } from "@/theme/LigthTheme";
import { ThemeProvider } from "@mui/material";
import { ReactNode, createContext, useState } from "react";

interface IAppThemeContext {
  mode: boolean;
  handleMode: () => void;
}

interface IAppThemeProvider {
  children: ReactNode;
}

export const AppThemeContext = createContext({
  mode: false,
  handleMode: () => console.log(),
} as IAppThemeContext);

export function AppThemeProvider(props: IAppThemeProvider) {
  const [mode, setMode] = useState<boolean>(false);
  function handleMode() {
    setMode(!mode);
  }
  const theme = LigthTheme;
  return (
    <AppThemeContext.Provider
      value={{
        mode,
        handleMode,
      }}
    >
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
}
