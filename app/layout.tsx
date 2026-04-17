import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forex Visual Analyzer — AI-Powered Multi-Timeframe Analysis",
  description:
    "Institutional-grade Forex chart analysis using Claude Vision. Upload 1D, 1H, and 5M charts for probabilistic forecasts with entry, stop loss, and take profit levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <AnalyticsProvider>
            {children}
            <Analytics />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
