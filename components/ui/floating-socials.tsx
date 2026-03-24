"use client";

import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  {
    href: "https://github.com/Duresa7",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/duresa-k-630039329/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:duresakadi@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

export function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center border border-line bg-surface/90 text-muted backdrop-blur-sm transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_12px_var(--glow)]"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}
