"use client";

import { useCallback, useContext, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";
import type { Theme } from "../types";
import { theme } from "../utils";
import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
  const { getLocalStorageValue, setLocalStorageValue } = useLocalStorage();

  const [systemTheme, setSystemTheme] = useState<Theme>(() => {
    const localTheme = getLocalStorageValue("theme");
    return localTheme ? localTheme : theme.bouquet;
  });

  const setTheme = useCallback(
    (value: Theme) => {
      setSystemTheme(value);
      setLocalStorageValue("theme", value);
    },
    [setSystemTheme, setLocalStorageValue]
  );

  return { systemTheme, setTheme };
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
