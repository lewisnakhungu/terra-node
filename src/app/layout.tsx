import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { TerraNodeProvider } from "@/context/TerraNodeContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "TerraNode — Offset AI Compute Footprint",
  description: "Tokenizing land restoration to offset AI data center arable land debt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col`}
      >
        <TerraNodeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </TerraNodeProvider>
      </body>
    </html>
  );
}
