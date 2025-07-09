"use client";
import { useEffect } from "react";
import { useAppContext } from "../context/useAppContext";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isDark } = useAppContext();
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(isDark ? "dark" : "light");
  }, [isDark]);
  return <>{children}</>;
}
