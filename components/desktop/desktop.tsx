"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import {
  desktopIcons,
  desktopWallpaperSrc,
  type DesktopIconConfig,
  type DesktopIconSide,
  type WindowId,
} from "@/content/desktop";
import { useDesktop } from "./desktop-context";
import { DesktopIcon } from "./desktop-icon";
import { DesktopWindow } from "./window";
import { WindowContent } from "./window-content";
import { Taskbar } from "./taskbar";
import { StartMenu } from "./start-menu";
import { ContextMenu, useContextMenu } from "./context-menu";

const desktopIconColumns: DesktopIconSide[] = ["left", "right"];

const desktopIconColumnClassNames: Record<DesktopIconSide, string> = {
  left: "absolute top-4 left-4 flex h-[calc(100%-60px)] flex-col flex-wrap content-start gap-1 md:top-6 md:left-6",
  right:
    "absolute top-4 right-4 flex h-[calc(100%-60px)] flex-col flex-wrap content-end gap-1 md:top-6 md:right-6",
};

function groupDesktopIconsBySide(
  icons: DesktopIconConfig[]
): Record<DesktopIconSide, DesktopIconConfig[]> {
  return icons.reduce<Record<DesktopIconSide, DesktopIconConfig[]>>(
    (groupedIcons, icon) => {
      groupedIcons[icon.side ?? "left"].push(icon);
      return groupedIcons;
    },
    { left: [], right: [] }
  );
}

const desktopIconsBySide = groupDesktopIconsBySide(desktopIcons);

export function Desktop() {
  const { state } = useDesktop();
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const { position: ctxPosition, onContextMenu, close: closeCtx } = useContextMenu();

  const openWindowIds = (
    Object.entries(state.windows) as [WindowId, (typeof state.windows)[WindowId]][]
  )
    .filter(([, win]) => win.isOpen)
    .map(([id]) => id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed inset-0 select-none overflow-hidden bg-background"
      onContextMenu={onContextMenu}
    >
      {/* ── Wallpaper background ───────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={desktopWallpaperSrc}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* ── Desktop icons ──────────────────────────── */}
      <div className="absolute inset-0 bottom-14 overflow-hidden p-4 md:p-6">
        {desktopIconColumns.map((side) => (
          <div key={side} className={desktopIconColumnClassNames[side]}>
            {desktopIconsBySide[side].map((icon, i) => (
              <DesktopIcon key={icon.id} config={icon} index={i} />
            ))}
          </div>
        ))}
      </div>

      {/* ── Windows ────────────────────────────────── */}
      {openWindowIds.map((id) => (
        <DesktopWindow key={id} id={id}>
          <WindowContent windowId={id} />
        </DesktopWindow>
      ))}

      {/* ── Start menu ─────────────────────────────── */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
      />

      {/* ── Context menu ───────────────────────────── */}
      <ContextMenu position={ctxPosition} onClose={closeCtx} />

      {/* ── Taskbar ────────────────────────────────── */}
      <Taskbar
        onStartMenuToggle={() => setStartMenuOpen((prev) => !prev)}
        startMenuOpen={startMenuOpen}
      />
    </motion.div>
  );
}
