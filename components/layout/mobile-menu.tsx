"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const navLinks = [
  { label: "about", href: "/#about" },
  { label: "experience", href: "/#experience" },
  { label: "education", href: "/#education" },
  { label: "skills", href: "/#skills" },
  { label: "projects", href: "/#projects" },
  { label: "work examples", href: "/work" },
  { label: "contact", href: "/#contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-background"
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                session active
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-muted">
                operator routing enabled
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-6 px-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="network-panel w-full px-5 py-4 font-mono text-xl text-muted transition-colors hover:text-accent"
              >
                <span className="flex items-center justify-between gap-4">
                  <span>{link.label}</span>
                  <span className="route-track h-3 w-20" />
                </span>
              </motion.a>
            ))}
          </nav>

          <div className="border-t border-line px-8 pb-8 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              <span className="text-accent">cmd+k</span> for quick nav
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
