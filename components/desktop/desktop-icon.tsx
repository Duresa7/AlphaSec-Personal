"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDesktop } from "./desktop-context";
import type { DesktopIconConfig } from "@/content/desktop";

interface DesktopIconProps {
  config: DesktopIconConfig;
  index: number;
}

export function DesktopIcon({ config, index }: DesktopIconProps) {
  const { openWindow } = useDesktop();
  const Icon = config.icon;

  const handleClick = () => {
    if (config.externalHref) {
      window.open(config.externalHref, "_blank", "noopener,noreferrer");
      return;
    }
    if (config.windowId) {
      openWindow(config.windowId);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
      onClick={handleClick}
      className={cn(
        "group flex w-[88px] flex-col items-center gap-1.5 rounded-lg p-2.5",
        "transition-all duration-200",
        "hover:bg-accent-dim/40",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-lg border border-line/60 bg-surface/80",
          "transition-all duration-200",
          "group-hover:border-accent/40 group-hover:shadow-[0_0_16px_rgba(0,232,122,0.15)]",
          "group-active:scale-95"
        )}
      >
        <Icon className="h-5.5 w-5.5 text-muted transition-colors group-hover:text-accent" />
      </div>
      <span className="ui-mono-label text-center text-[10px] leading-tight text-muted/80 transition-colors group-hover:text-foreground">
        {config.label}
      </span>
    </motion.button>
  );
}
