import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GridBackground } from "@/components/ui/grid-background";

import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CommandPalette } from "@/components/ui/command-palette";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Duresa Kadi — Cybersecurity & IT Professional",
  description:
    "Entry-level cybersecurity and IT professional with hands-on experience in SIEM deployment, network security, cloud infrastructure, and incident response.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll>
            <GridBackground />
            <ScrollProgress />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
            <CommandPalette />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
