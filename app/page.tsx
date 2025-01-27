"use client";

import { useEffect } from "react";

import { useThemeContext } from "@/hooks/useTheme";

export default function Home() {
  const { systemTheme } = useThemeContext();

  useEffect(() => {
    window.location.href = "/new";
  }, []);

  return (
    <div
      className="h-screen w-full overflow-y-auto"
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    ></div>
  );
}
