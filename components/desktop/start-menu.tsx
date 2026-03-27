"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useDesktop } from "./desktop-context";
import { desktopIcons } from "@/content/desktop";
import { siteProfile } from "@/content/site";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const { openWindow } = useDesktop();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65]"
            onClick={onClose}
          />

          {/* Menu — centered above taskbar */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[66] w-[520px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-black/[0.08] bg-white/85 shadow-2xl shadow-black/12 backdrop-blur-2xl"
          >
            {/* Search bar */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center gap-2.5 rounded-full bg-background px-4 py-2.5 border border-black/[0.08]">
                <Search className="h-4 w-4 text-foreground/40" />
                <span className="text-sm text-foreground/40">Search apps</span>
              </div>
            </div>

            {/* Pinned apps heading */}
            <div className="px-5 pt-1 pb-2">
              <p className="text-xs font-semibold text-foreground/70">Pinned</p>
            </div>

            {/* App grid */}
            <div className="px-3 pb-3">
              <div className="grid grid-cols-4 gap-0.5">
                {desktopIcons.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.externalHref) {
                          window.open(
                            item.externalHref,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        } else if (item.windowId) {
                          openWindow(item.windowId);
                        }
                        onClose();
                      }}
                      className="flex flex-col items-center gap-1.5 rounded-lg p-3 transition-colors hover:bg-black/[0.05]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center">
                        <Icon className="h-6 w-6 text-foreground/70" />
                      </div>
                      <span className="text-[11px] font-medium text-foreground/70 text-center leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-black/[0.06]" />

            {/* User profile footer */}
            <div className="flex items-center gap-3 px-5 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                <span className="text-xs font-bold">
                  {siteProfile.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground/90 truncate">
                  {siteProfile.name}
                </p>
                <p className="text-[11px] text-foreground/50 truncate">
                  {siteProfile.emailAddress}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
