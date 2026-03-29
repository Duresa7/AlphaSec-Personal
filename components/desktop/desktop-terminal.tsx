"use client";

import { siteProfile } from "@/content/site";
import { education, certifications } from "@/content/education";

const terminalLines = [
  { prompt: true, text: "neofetch" },
  { text: "" },
  {
    text: `  ██████╗ ██╗   ██╗██████╗ ███████╗███████╗ █████╗`,
    color: "accent",
  },
  {
    text: `  ██╔══██╗██║   ██║██╔══██╗██╔════╝██╔════╝██╔══██╗`,
    color: "accent",
  },
  {
    text: `  ██║  ██║██║   ██║██████╔╝█████╗  ███████╗███████║`,
    color: "accent",
  },
  {
    text: `  ██║  ██║██║   ██║██╔══██╗██╔══╝  ╚════██║██╔══██║`,
    color: "accent",
  },
  {
    text: `  ██████╔╝╚██████╔╝██║  ██║███████╗███████║██║  ██║`,
    color: "accent",
  },
  {
    text: `  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝`,
    color: "accent",
  },
  { text: "", color: "accent" },
  {
    text: `  ██╗  ██╗ █████╗ ██████╗ ██╗`,
    color: "accent",
  },
  {
    text: `  ██║ ██╔╝██╔══██╗██╔══██╗██║`,
    color: "accent",
  },
  {
    text: `  █████╔╝ ███████║██║  ██║██║`,
    color: "accent",
  },
  {
    text: `  ██╔═██╗ ██╔══██║██║  ██║██║`,
    color: "accent",
  },
  {
    text: `  ██║  ██╗██║  ██║██████╔╝██║`,
    color: "accent",
  },
  {
    text: `  ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝`,
    color: "accent",
  },
  { text: "" },
  { text: `  OS:       AlphaSec Desktop v3.1`, color: "light" },
  { text: `  CPU:      AMD Ryzen 9 9950X3D`, color: "light" },
  { text: `  GPU:      NVIDIA RTX 5070 Ti (MSI)`, color: "light" },
  { text: `  RAM:      Corsair DDR5 32GB CL30 6000MHz`, color: "light" },
  { text: `  Disk:     Samsung 990 Pro 2TB + 980 Pro 1TB`, color: "light" },
  { text: `  Shell:    bash 5.2.21`, color: "light" },
  { text: `  User:     ${siteProfile.name}`, color: "light" },
  { text: `  Location: ${siteProfile.locationLabel}`, color: "light" },
  { text: `  Theme:    win11-blue [light]`, color: "light" },
  { text: "" },
  { prompt: true, text: "cat resume/profile.txt" },
  {
    text: `  ${siteProfile.name}`,
    color: "accent",
  },
  {
    text: `  ${education[0].degree}`,
    color: "light",
  },
  {
    text: `  ${certifications[0]}`,
    color: "light",
  },
  {
    text: `  ${certifications[1]}`,
    color: "light",
  },
  {
    text: `  ${education[0].expected}`,
    color: "light",
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
    color: "light",
  },
  {
    text: `  to explore the portfolio. Stay sharp.`,
    color: "light",
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
            <span className="text-[#58a6ff]">
              duresa@kadi<span className="text-[#8b949e]">:</span>
              <span className="text-[#79c0ff]">~</span>
              <span className="text-[#8b949e]">$ </span>
            </span>
          )}
          <span
            className={
              line.color === "accent"
                ? "text-[#60a5fa]"
                : line.color === "light"
                  ? "text-[#b0b8c4]"
                  : line.color === "muted"
                    ? "text-[#8b949e]"
                    : "text-[#e6edf3]"
            }
          >
            {line.text}
          </span>
          {"cursor" in line && line.cursor && (
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-[blink_1s_step-end_infinite] bg-[#58a6ff]" />
          )}
        </div>
      ))}
    </div>
  );
}
