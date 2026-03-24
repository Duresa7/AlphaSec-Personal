"use client";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { socialLinks } from "@/content/site";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  "map-pin": MapPin,
} as const;

export function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {socialLinks
        .filter((link) => link.icon !== "map-pin")
        .map((link) => {
          const Icon = iconMap[link.icon];
          const isExternal = link.href.startsWith("http");

          return (
            <a
              key={link.key}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              className="flex h-10 w-10 items-center justify-center border border-line bg-surface/90 text-muted backdrop-blur-sm transition-all hover:border-accent hover:text-accent"
            >
              <Icon size={16} />
            </a>
          );
        })}
    </div>
  );
}
