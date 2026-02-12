"use client";

import { createContext, useContext } from "react";

export const ThemeContext = createContext("dark");

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>;
}

export const useThemeConfig = () => useContext(ThemeContext);
