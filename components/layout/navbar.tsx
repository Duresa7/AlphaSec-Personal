"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useActiveSection } from "@/hooks/use-active-section";

const navLinks = [
  { label: "experience", id: "experience", href: "/#experience" },
  { label: "education", id: "education", href: "/#education" },
  { label: "skills", id: "skills", href: "/#skills" },
  { label: "projects", id: "projects", href: "/#projects" },
  { label: "work examples", id: "work", href: "/work" },
  { label: "contact", id: "contact", href: "/#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-[2px] left-0 right-0 z-40 border-b border-line bg-background/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-0.5">
            <span className="font-mono text-sm font-semibold text-foreground">
              DK
            </span>
            <span className="inline-block h-4 w-[2px] bg-accent animate-blink" />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-mono text-[11px] lowercase tracking-wider text-muted transition-colors hover:text-foreground"
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-8 w-8 items-center justify-center border border-line text-muted transition-colors hover:text-foreground md:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
