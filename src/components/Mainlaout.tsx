"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SHOW_LAYOUT_ROUTES = ["/", "/chat", "/update", "/vidfloh"];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div
      className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--primary-bg)" }}
    >
      {SHOW_LAYOUT_ROUTES.includes(pathname) && <Navbar />}

      <main className="flex-1  pb-0 px-4">{children}</main>
      {SHOW_LAYOUT_ROUTES.includes(pathname) && <Footer />}
    </div>
  );
};

export default MainLayout;
