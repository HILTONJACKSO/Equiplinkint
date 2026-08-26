import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/ui/splash-screen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heavy Equipment & Logistics Marketplace",
  description: "Find trusted heavy equipment, trucks, operators, and logistics services across Liberia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-[#0F172A]">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
