import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SecurityWrapper from '../components/SecurityWrapper';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-font-mono", // Fixed typo from your snippet: --font-font-mono to --font-geist-mono
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S.R.K Strategic | High-Stakes Real Estate Vetting",
  description: "Professional legal liaisoning...",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        
        <SecurityWrapper>
          {children}
        </SecurityWrapper>
      </body>
    </html>
  );
}