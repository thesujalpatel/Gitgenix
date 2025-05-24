import type { Metadata } from "next";
import "./globals.css";
import { Mona_Sans } from "next/font/google";
import Navigation from "./components/Navigation";
import ToastProvider from "./providers/ToastProvider";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arcadia - GitHub Contribution Art",
  description: "Create and share beautiful GitHub contribution patterns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${monaSans.className}`}>
        <Navigation />
        <ToastProvider />
        <div className="max-w-6xl mx-auto px-4">{children}</div>
      </body>
    </html>
  );
}
