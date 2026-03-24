"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { label: "/about", href: "/#about" },
  { label: "/experience", href: "/#experience" },
  { label: "/education", href: "/#education" },
  { label: "/skills", href: "/#skills" },
  { label: "/projects", href: "/#projects" },
  { label: "/work-examples", href: "/work" },
  { label: "/contact", href: "/#contact" },
];

const links = [
  { label: "github.com/Duresa7", href: "https://github.com/Duresa7" },
  {
    label: "linkedin.com/in/duresa-k",
    href: "https://www.linkedin.com/in/duresa-k-630039329/",
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setEasterEgg(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(href);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("duresakadi@gmail.com");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/60 pt-[20vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border border-line bg-surface shadow-2xl"
          >
            <Command
              className="font-mono text-sm"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
              filter={(value, search) => {
                if (search === "sudo rm -rf /") return 0;
                if (value.includes(search.toLowerCase())) return 1;
                return 0;
              }}
            >
              <div className="flex items-center border-b border-line px-4">
                <span className="text-accent mr-2">&gt;</span>
                <Command.Input
                  placeholder="type a command..."
                  className="flex-1 bg-transparent py-3 text-foreground placeholder:text-muted/50 outline-none"
                  onValueChange={(v) => {
                    if (v === "sudo rm -rf /") {
                      setEasterEgg(true);
                    } else {
                      setEasterEgg(false);
                    }
                  }}
                />
              </div>

              {easterEgg ? (
                <div className="p-4 text-[11px] text-accent">
                  nice try. // access denied
                </div>
              ) : (
                <Command.List className="max-h-64 overflow-y-auto p-2">
                  <Command.Empty className="px-4 py-3 text-[11px] text-muted">
                    no results found.
                  </Command.Empty>

                  <Command.Group
                    heading={
                      <span className="px-2 text-[10px] uppercase tracking-widest text-muted/50">
                        navigate
                      </span>
                    }
                  >
                    {sections.map((s) => (
                      <Command.Item
                        key={s.href}
                        value={`navigate ${s.label}`}
                        onSelect={() => navigate(s.href)}
                        className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[12px] text-muted transition-colors data-[selected=true]:bg-accent-dim data-[selected=true]:text-foreground"
                      >
                        <span className="text-accent/60">~</span>
                        {s.label}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group
                    heading={
                      <span className="mt-2 block px-2 text-[10px] uppercase tracking-widest text-muted/50">
                        actions
                      </span>
                    }
                  >
                    <Command.Item
                      value="toggle theme dark light"
                      onSelect={() => {
                        setTheme(resolvedTheme === "dark" ? "light" : "dark");
                        setOpen(false);
                      }}
                      className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[12px] text-muted transition-colors data-[selected=true]:bg-accent-dim data-[selected=true]:text-foreground"
                    >
                      <span className="text-accent/60">$</span>
                      theme --toggle
                    </Command.Item>
                    <Command.Item
                      value="copy email duresakadi"
                      onSelect={copyEmail}
                      className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[12px] text-muted transition-colors data-[selected=true]:bg-accent-dim data-[selected=true]:text-foreground"
                    >
                      <span className="text-accent/60">$</span>
                      copy email
                    </Command.Item>
                    <Command.Item
                      value="show certs certifications education"
                      onSelect={() => navigate("/#education")}
                      className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[12px] text-muted transition-colors data-[selected=true]:bg-accent-dim data-[selected=true]:text-foreground"
                    >
                      <span className="text-accent/60">$</span>
                      show certs
                    </Command.Item>
                    <Command.Item
                      value="contact --secure contact secure"
                      onSelect={() => navigate("/#contact")}
                      className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[12px] text-muted transition-colors data-[selected=true]:bg-accent-dim data-[selected=true]:text-foreground"
                    >
                      <span className="text-accent/60">$</span>
                      contact --secure
                    </Command.Item>
                  </Command.Group>

                  <Command.Group
                    heading={
                      <span className="mt-2 block px-2 text-[10px] uppercase tracking-widest text-muted/50">
                        links
                      </span>
                    }
                  >
                    {links.map((l) => (
                      <Command.Item
                        key={l.href}
                        value={`link ${l.label}`}
                        onSelect={() => navigate(l.href)}
                        className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[12px] text-muted transition-colors data-[selected=true]:bg-accent-dim data-[selected=true]:text-foreground"
                      >
                        <span className="text-accent/60">&gt;</span>
                        {l.label}
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              )}
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
