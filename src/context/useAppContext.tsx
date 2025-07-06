"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface AppContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
  isDark: boolean;
  toggleTheme: () => void;
}


const AppContext = createContext<AppContextProps | undefined>(undefined);


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (storedTheme === null && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []); 

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark); 

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };


  const value = {
    user,
    setUser,
    isDark,
    toggleTheme,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 