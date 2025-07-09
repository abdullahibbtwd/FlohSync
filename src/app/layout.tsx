import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import MainLayout from "@/components/Mainlaout";
import { AppProvider } from "@/context/useAppContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Toaster } from 'sonner';

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <ThemeWrapper>
            <MainLayout>
            <Toaster />
              {children}
            </MainLayout>
          </ThemeWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
