import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { socialLinks } from "@/content/site";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  "map-pin": MapPin,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 lg:px-8 py-10 md:flex-row md:justify-between">
        <p className="ui-mono-meta text-muted">
          <span className="text-accent">&gt;</span>{" "}
          <span className="text-muted">duresa@kadi:~$</span>{" "}
          <span className="text-foreground/60">
            echo &quot;&copy; {currentYear}&quot;
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
          <span className="ui-mono-meta ml-2 hidden text-muted/50 md:inline">
            cmd+k
          </span>
        </div>
      </div>
    </footer>
  );
}
