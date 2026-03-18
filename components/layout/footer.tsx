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
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Duresa Kadi
        </p>
        <div className="flex items-center gap-4">
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
                  className="text-muted transition-colors hover:text-foreground"
                  aria-label={link.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}
        </div>
      </div>
    </footer>
  );
}
