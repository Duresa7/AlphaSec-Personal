"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { navItems } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";

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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              <span className="font-mono text-sm font-semibold text-foreground">
                DK
              </span>
              <span className="inline-block h-4 w-[2px] bg-accent animate-caret" />
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <span className="route-node" />
              <div className="ui-mono-label flex items-center gap-2 text-muted">
                <span className="text-accent">session: active</span>
                <span className="text-muted/45">|</span>
                <span>mode: ops</span>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="ui-mono-meta group relative lowercase text-muted transition-colors hover:text-foreground"
              >
                {link.label}
                {activeSection === link.sectionId && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-2 left-0 right-0 h-3"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  >
                    <span className="route-track absolute inset-x-0 top-1/2 h-3 -translate-y-1/2" />
                  </motion.span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent md:hidden"
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
