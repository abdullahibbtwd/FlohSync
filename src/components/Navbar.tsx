"use client";
import Image from "next/image";
import React, { useState } from "react";
import {  Menu, X, Search,LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeButton } from "./ThemeButton";
import { useAppContext } from "@/context/useAppContext";
import axios from "axios";


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { userData,backendUrl } = useAppContext();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchClick = () => {
    router.push("/search");
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/logout`, {}, {
        withCredentials: true
      });
      
      if (response.data.success) {
        router.push('/auth');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  const handleMenuItemClick = (item: string) => {
    switch (item) {
      case "Flow Mates":
        router.push("/flow-mates");
        break;
      case "Settings":
        router.push("/settings");
        break;
      case "Profile":
        router.push("/profile");
        break;
      default:
        break;
    }
    setIsSidebarOpen(false); // Close sidebar after navigation
  };

  return (
    <>
      <div
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 z-50 shadow-md flex justify-between items-center px-4 py-2"
        style={{
          backgroundColor: "var(--secondary-bg)",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={50}
            style={{ filter: "var(--logo-filter)" }}
            className="w-8 h-8  md:w-13 md:h-13"
          />

          <h2
            className="italic text-xl md:text-2xl font-semibold bg-gradient-to-r from-green-500 to-black dark:from-white dark:to-green-500 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--gradient-start) 0%, var(--gradient-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FlohSync
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* User and Theme buttons - hidden on small devices */}
          <div className="hidden md:flex items-center gap-2">
            <div
              className="w-10 h-10 flex transition-all duration-300 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--accent)",
              }}
            >
              <button
                onClick={() => router.push("/profile")}
                className="flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 w-full h-full"
              >
                <Image
                  src={userData?.profilePicture || "/user.jpg"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              </button>
            </div>

            <div
              className="w-10 h-10 flex transition-all duration-300 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--secondary-bg)",
              }}
            >
              <ThemeButton />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="w-10 h-10 flex transition-all duration-300 items-center justify-center rounded-full hover:scale-110"
            style={{
              backgroundColor: "var(--secondary-bg)",
              color: "var(--primary-text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent)";
              e.currentTarget.style.color = "black";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--secondary-bg)";
              e.currentTarget.style.color = "var(--primary-text)";
            }}
          >
            <Search size={20} />
          </button>

          {/* Burger Menu Button */}
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 flex transition-all duration-300 items-center justify-center rounded-full hover:scale-110"
            style={{
              backgroundColor: "var(--secondary-bg)",
              color: "var(--primary-text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent)";
              e.currentTarget.style.color = "black";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--secondary-bg)";
              e.currentTarget.style.color = "var(--primary-text)";
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Custom Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          />

          {/* Sidebar */}
          <div
            className="fixed top-0 right-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out"
            style={{
              backgroundColor: "var(--secondary-bg)",
              color: "var(--primary-text)",
              transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{
                borderBottomColor: "var(--accent)",
              }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={32}
                  height={32}
                  style={{ filter: "var(--logo-filter)" }}
                />
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {["Flow Mates", "Settings", "Profile"].map((item, index) => (
                <div key={item}>
                  <button
                    onClick={() => handleMenuItemClick(item)}
                    className="w-full p-3 text-left rounded-md transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      color: "var(--primary-text)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent)";
                      e.currentTarget.style.color = "black";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--primary-text)";
                    }}
                  >
                    <span className="font-medium">{item}</span>
                  </button>
                  {index < 3 && (
                    <div
                      className="h-px my-2 opacity-30"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  )}
                  
                </div>
              ))}
                <div className="w-full">
                <button 
                onClick={handleLogout}
                className="w-full p-2 flex gap-3 text-left text-sm font-semibold bg-red-700  rounded-md transition-all duration-300 hover:scale-105 cursor-pointer" >
                   <LogOut size={20} className=""/> Logout
                  </button>
                </div>
              {/* Mobile-only User and Theme buttons */}
              <div className="md:hidden">
                <div
                  className="h-px my-4 opacity-30"
                  style={{ backgroundColor: "var(--accent)" }}
                />

                <div className="flex items-center justify-between p-3">
                  <span className="font-medium text-sm opacity-70">
                    Quick Actions
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3">
                  <div
                    className="w-10 h-10 flex transition-all duration-300 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--accent)",
                    }}
                  >
                    <button
                      onClick={() => router.push("/profile")}
                      className="flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 w-full h-full"
                    >
                      <Image
                        src={userData?.profilePicture || "/user.jpg"}
                        alt="profile"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </button>
                  </div>

                  <div
                    className="w-10 h-10 flex transition-all duration-300 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--secondary-bg)",
                    }}
                  >
                    <ThemeButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
