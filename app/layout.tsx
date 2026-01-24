import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SecurityWrapper from '../components/SecurityWrapper';
import "./globals.css"; // IMPORTANT: Keep this for your Tailwind styles

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-font-mono",
  subsets: ["latin"],
});

// This replaces the "Create Next App" metadata entirely
export const metadata: Metadata = {
  title: "S.R.K Strategic | High-Stakes Real Estate Vetting",
  description: "Professional legal liaisoning...",
  icons: {
    icon: "/icon.png", // This points to public/icon.png
    shortcut: "/icon.png",
    apple: "/icon.png", // For iPhones
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
        {/* Everything inside SecurityWrapper is now protected */}
        <SecurityWrapper>
          {children}
        </SecurityWrapper>
      </body>
    </html>
  );
}