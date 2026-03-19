"use client";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { socialLinks } from "@/content/social";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  "map-pin": MapPin,
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">&gt;</span>{" "}
          <span className="text-muted">duresa@kadi:~$</span>{" "}
          <span className="text-foreground/60">
            echo &quot;&copy; {new Date().getFullYear()}&quot;
          </span>
        </p>

        <div className="flex items-center gap-3">
          {socialLinks
            .filter((l) => l.href !== "#")
            .map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex h-8 w-8 items-center justify-center border border-line text-muted transition-colors hover:text-accent hover:border-accent"
                  aria-label={link.label}
                >
                  <Icon size={14} />
                </a>
              );
            })}
          <span className="ml-2 font-mono text-[10px] text-muted/50 hidden md:inline">
            cmd+k
          </span>
        </div>
      </div>
    </footer>
  );
}
