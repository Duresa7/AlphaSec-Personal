import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script
          defer
          src="https://umami.alphsec.com/script.js"
          data-website-id="132d6f2f-a1d4-4e62-a44d-1a8cf1bc080b"
          strategy="afterInteractive"
        />
      </head>
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
