"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FolderOpen, Sun, Moon, Info } from "lucide-react";
import { useTheme } from "next-themes";
import { useDesktop } from "./desktop-context";

interface MenuPosition {
  x: number;
  y: number;
}

export function useContextMenu() {
  const [position, setPosition] = useState<MenuPosition | null>(null);

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const close = useCallback(() => setPosition(null), []);

  return { position, onContextMenu, close };
}

interface ContextMenuProps {
  position: MenuPosition | null;
  onClose: () => void;
}

export function ContextMenu({ position, onClose }: ContextMenuProps) {
  const { openWindow } = useDesktop();
  const { theme, setTheme } = useTheme();

  if (!position) return null;

  // Keep menu within viewport
  const menuW = 200;
  const menuH = 170;
  const x = Math.min(position.x, window.innerWidth - menuW - 8);
  const y = Math.min(position.y, window.innerHeight - menuH - 56);

  const items = [
    {
      label: "Open Terminal",
      icon: Terminal,
      action: () => openWindow("terminal"),
    },
    {
      label: "Open File Manager",
      icon: FolderOpen,
      action: () => openWindow("file-manager"),
    },
    { divider: true },
    {
      label: theme === "dark" ? "Light Mode" : "Dark Mode",
      icon: theme === "dark" ? Sun : Moon,
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
    {
      label: "About System",
      icon: Info,
      action: () => {
        /* opens a small alert-like info */
        openWindow("terminal");
      },
    },
  ] as const;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70]"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }}
      />

      {/* Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.12 }}
        className="fixed z-[71] min-w-[180px] overflow-hidden border border-line/80 bg-surface/98 py-1 shadow-xl backdrop-blur-lg"
        style={{ top: y, left: x }}
      >
        {items.map((item, i) =>
          "divider" in item ? (
            <div key={i} className="my-1 h-px bg-line/50" />
          ) : (
            <button
              key={i}
              onClick={() => {
                item.action();
                onClose();
              }}
              className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left transition-colors hover:bg-accent-dim/30"
            >
              <item.icon className="h-3.5 w-3.5 text-muted" />
              <span className="ui-mono-meta text-foreground/85">
                {item.label}
              </span>
            </button>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
}
