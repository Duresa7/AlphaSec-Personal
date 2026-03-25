"use client";

import { siteProfile } from "@/content/site";

const terminalLines = [
  { prompt: true, text: "neofetch" },
  { text: "" },
  {
    text: `  ╔══════════════════════════════════╗`,
    color: "accent",
  },
  {
    text: `  ║    ▄▀▀▄ █   █▀▀█ █  █ ▄▀▀▄     ║`,
    color: "accent",
  },
  {
    text: `  ║    █▀▀█ █   █▄▄█ █▀▀█ █▀▀█     ║`,
    color: "accent",
  },
  {
    text: `  ║    ▀  ▀ ▀▀▀ ▀    ▀  ▀ ▀  ▀     ║`,
    color: "accent",
  },
  {
    text: `  ╚══════════════════════════════════╝`,
    color: "accent",
  },
  { text: "" },
  { text: `  OS:       AlphaSec Desktop v3.1`, color: "muted" },
  { text: `  Kernel:   6.8.0-security-hardened`, color: "muted" },
  { text: `  Shell:    bash 5.2.21`, color: "muted" },
  { text: `  User:     ${siteProfile.name}`, color: "muted" },
  { text: `  Location: ${siteProfile.locationLabel}`, color: "muted" },
  { text: `  Uptime:   since boot sequence`, color: "muted" },
  { text: `  Packages: 847 (apt)`, color: "muted" },
  { text: `  Theme:    hacker-green [dark]`, color: "muted" },
  { text: "" },
  { prompt: true, text: "whoami" },
  {
    text: `  IT & Cybersecurity Professional`,
    color: "accent",
  },
  {
    text: `  Cloud Infrastructure · Networking · Security Ops`,
    color: "muted",
  },
  { text: "" },
  { prompt: true, text: "cat /etc/motd" },
  { text: "" },
  {
    text: `  Welcome to AlphaSec Workstation.`,
    color: "accent",
  },
  {
    text: `  All systems operational. Click the desktop icons`,
    color: "muted",
  },
  {
    text: `  to explore the portfolio. Stay sharp.`,
    color: "muted",
  },
  { text: "" },
  { prompt: true, text: "", cursor: true },
];

export function DesktopTerminal() {
  return (
    <div className="h-full bg-[#0d0e10] p-4 font-mono text-sm leading-relaxed">
      {terminalLines.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {line.prompt && (
            <span className="text-accent">
              duresa@kadi<span className="text-muted">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-muted">$ </span>
            </span>
          )}
          <span
            className={
              line.color === "accent"
                ? "text-accent"
                : line.color === "muted"
                  ? "text-muted/70"
                  : "text-foreground/90"
            }
          >
            {line.text}
          </span>
          {"cursor" in line && line.cursor && (
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-[blink_1s_step-end_infinite] bg-accent" />
          )}
        </div>
      ))}
    </div>
  );
}
