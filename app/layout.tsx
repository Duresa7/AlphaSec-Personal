import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CommandPalette } from "@/components/ui/command-palette";
import { FloatingSocials } from "@/components/ui/floating-socials";
import { ScrollDownIndicator } from "@/components/ui/scroll-down-indicator";
import { BootScreen } from "@/components/ui/boot-screen";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Duresa Kadi - IT & Security Professional",
  description:
    "IT & Security Professional - cloud infrastructure, networking, systems administration, and security operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${ibmPlexMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <BootScreen />
          <SmoothScroll>
            <ScrollProgress />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
            <CommandPalette />
            <FloatingSocials />
            <ScrollDownIndicator />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
