import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import DarkMode from "@/components/dark/darkMode";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { ModalProvider } from "@/context/modalContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sason Putumayense",
  description: "Site web of Sason Putumayense",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 dark:bg-gray-900 text-gray-800 dark:text-slate-50`}>
      <ModalProvider>
        <SessionAuthProvider>
          <Navbar />
          {children}
          <DarkMode />
        </SessionAuthProvider>
      </ModalProvider>
      </body>
    </html>
  );
}
