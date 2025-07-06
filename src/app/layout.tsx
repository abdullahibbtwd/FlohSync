import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/useAppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlohSync",
  description: "A modern, open-source, and self-hosted alternative to Floh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full overflow-x-hidden text-primary-text dark:text-secondary-text`}
        style={{ backgroundColor: 'transparent', position: 'relative' }}>
        {/* Full-screen background gradient */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-600 to-slate-900 bg-cover" />
        <AppProvider>
          <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto min-h-screen flex flex-col"
            style={{backgroundColor:"var(--primary-bg)"}}
          >
            <Navbar />
            <main className="flex-1 pt-20 pb-24 px-4">
              {children}
            </main>
            <Footer/>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
