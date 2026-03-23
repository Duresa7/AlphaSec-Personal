"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const navLinks = [
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
          <div className="flex h-14 items-center justify-end px-6">
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center border border-line text-muted transition-colors hover:text-foreground"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="font-mono text-2xl text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <div className="px-8 pb-8">
            <p className="font-mono text-[10px] text-muted">
              <span className="text-accent">cmd+k</span> for quick nav
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
