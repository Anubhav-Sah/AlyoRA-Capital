import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlyoRA Capital Research — Where Research Meets Returns",
  description: "Professional equity research, investment advisory, and mutual fund guidance for investors who demand clarity, precision, and results.",
  keywords: ["AlyoRA Capital", "Equity Research", "Investment Advisory", "Mutual Funds", "Financial Planning", "Sub-Broker"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-[#F7F8FA] text-[#0D1F3C] font-sans antialiased selection:bg-[#27A84E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
