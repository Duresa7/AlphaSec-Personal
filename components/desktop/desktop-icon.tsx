"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDesktop } from "./desktop-context";
import type { DesktopIconConfig } from "@/content/desktop";
import { activateDesktopIcon } from "./icon-actions";

interface DesktopIconProps {
  config: DesktopIconConfig;
  index: number;
}

export function DesktopIcon({ config, index }: DesktopIconProps) {
  const { openWindow } = useDesktop();
  const Icon = config.icon;
  const ariaLabel = config.externalHref
    ? `${config.label} (opens in a new tab)`
    : config.label;

  const handleClick = () => activateDesktopIcon(config, openWindow);

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "group flex w-[110px] flex-col items-center gap-2 rounded-lg p-3",
        "transition-all duration-150",
        "hover:bg-white/15",
        "active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      )}
    >
      <div
        className="flex h-16 w-16 items-center justify-center"
        style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.45))" }}
      >
        <Icon className="h-11 w-11 text-white" />
      </div>
      <span
        className="text-center text-sm font-medium leading-tight text-white max-w-full"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 0 6px rgba(0,0,0,0.3)" }}
      >
        {config.label}
      </span>
    </motion.button>
  );
}
