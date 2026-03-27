"use client";

import type { DesktopIconConfig, WindowId } from "@/content/desktop";

type OpenWindow = (id: WindowId) => void;

export function activateDesktopIcon(
  config: DesktopIconConfig,
  openWindow: OpenWindow
) {
  if (config.externalHref) {
    window.open(config.externalHref, "_blank", "noopener,noreferrer");
    return;
  }

  if (config.windowId) {
    openWindow(config.windowId);
  }
}
