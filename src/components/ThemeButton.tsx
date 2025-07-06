"use client";
import { Sun, Moon } from "lucide-react";
import { useAppContext } from "@/context/useAppContext";

export const ThemeButton = () => {
const {isDark, toggleTheme} = useAppContext();
  return (
    <div className="flex items-center justify-center w-full ">
      <button
        onClick={toggleTheme} 
        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg cursor-pointer"
      >
        {isDark ?
          <Sun className="text-2xl text-[#eeff00] " /> :
          <Moon className="text-2xl text-black" fill="black" />}
      </button>
    </div>
  );
};