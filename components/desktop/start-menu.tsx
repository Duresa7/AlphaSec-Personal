"use client";

import { motion, AnimatePresence } from "framer-motion";
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

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="fixed bottom-14 left-2 z-[66] w-72 overflow-hidden border border-line/80 bg-surface/98 shadow-2xl backdrop-blur-lg"
          >
            {/* Header */}
            <div className="border-b border-line/60 px-4 py-3">
              <p className="ui-mono-label text-accent">{siteProfile.name}</p>
              <p className="ui-mono-meta mt-0.5 text-muted/70">
                {siteProfile.emailAddress}
              </p>
            </div>

            {/* App list */}
            <div className="max-h-[400px] overflow-y-auto py-1">
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
                    className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-accent-dim/30"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted" />
                    <div className="min-w-0">
                      <p className="ui-mono-meta truncate text-foreground/90">
                        {item.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-line/60 px-4 py-2">
              <p className="ui-mono-label text-[9px] text-muted/50">
                AlphaSec Desktop v3.1
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
