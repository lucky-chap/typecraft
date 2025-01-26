import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import ThemeProvider from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Typecraft",
  description: "Type out your heart",
  openGraph: {
    title: "Typecraft",
    description: "Type out your heart",
    url: "https://typecraft.vercel.app",
    siteName: "Typecraft",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: false,
    nocache: true,
    noarchive: true,
  },
  icons: {
    icon: [
      { type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
      { type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  metadataBase: new URL(
    process.env.VERCEL
      ? "https://typecraft.vercel.app"
      : "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div id="root"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
