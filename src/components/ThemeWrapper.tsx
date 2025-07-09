"use client";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useAppContext();
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);
  return <>{children}</>;
}
