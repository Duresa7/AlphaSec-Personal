import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { DesktopProvider } from "@/components/desktop/desktop-context";
import { BootScreen } from "@/components/ui/boot-screen";
import { certifications, education } from "@/content/education";
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
  title: "Duresa Kadi",
  description: `${certifications[0]}, ${certifications[1]}, ${education[0].degree}, ${education[0].expected}.`,
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
          <DesktopProvider>
            <BootScreen />
            {children}
          </DesktopProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
