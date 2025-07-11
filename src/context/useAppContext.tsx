"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
interface UserData {
  username: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profilePicture: string;
  coverPicture: string;
}
interface AppContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
  isDark: boolean;
  toggleTheme: () => void;
  router: ReturnType<typeof useRouter>;
  userData: UserData | null;
  getUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (storedTheme === null && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true,
      });
      console.log(response.data); // Should show { success: true, userData: { ... } }

      if (response.data.success) {
        setUserData(response.data.userData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []); // Fetch user data on component mount
  const value = {
    user,
    setUser,
    isDark,
    toggleTheme,
    router,
    getUserData,
    userData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
