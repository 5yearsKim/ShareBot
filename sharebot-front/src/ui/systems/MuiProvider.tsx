"use client";

import React, { useMemo, ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { generateTheme } from "./theme";

export function MuiProvider({ children }: {children: ReactNode}) {

  const theme = useMemo(() => {
    const isDark = false;
    return generateTheme(isDark);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );

}