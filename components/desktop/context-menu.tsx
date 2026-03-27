"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FolderOpen, Info } from "lucide-react";
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

  if (!position) return null;

  // Keep menu within viewport
  const menuW = 200;
  const menuH = 140;
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
      label: "About System",
      icon: Info,
      action: () => {
        openWindow("terminal");
      },
    },
  ] as const;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="ctx-backdrop"
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
        key="ctx-menu"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.1 }}
        className="fixed z-[71] min-w-[200px] overflow-hidden rounded-lg border border-black/[0.08] bg-white/85 py-1 shadow-xl shadow-black/10 backdrop-blur-xl"
        style={{ top: y, left: x }}
      >
        {items.map((item, i) =>
          "divider" in item ? (
            <div key={i} className="my-1 h-px bg-black/[0.06] mx-2" />
          ) : (
            <button
              key={i}
              onClick={() => {
                item.action();
                onClose();
              }}
              className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left transition-colors hover:bg-black/[0.05] rounded-[4px] mx-0.5"
              style={{ width: "calc(100% - 4px)" }}
            >
              <item.icon className="h-4 w-4 text-foreground/50" />
              <span className="text-sm text-foreground/85">
                {item.label}
              </span>
            </button>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
}
