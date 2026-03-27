"use client";

import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDesktop } from "./desktop-context";
import { windowConfigs, type WindowId } from "@/content/desktop";
import { SystemTray } from "./system-tray";

interface TaskbarProps {
  onStartMenuToggle: () => void;
  startMenuOpen: boolean;
}

export function Taskbar({ onStartMenuToggle, startMenuOpen }: TaskbarProps) {
  const { state, openWindow, focusWindow } = useDesktop();

  const openWindows = (Object.entries(state.windows) as [WindowId, typeof state.windows[WindowId]][])
    .filter(([, win]) => win.isOpen);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex h-14 items-center bg-white/70 backdrop-blur-xl border-t border-black/[0.06] px-3">
      {/* Left spacer */}
      <div className="flex-1" />

      {/* Center: start button + open window icons */}
      <div className="flex items-center gap-1">
        {/* Start button */}
        <button
          onClick={onStartMenuToggle}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-md transition-colors",
            startMenuOpen
              ? "bg-accent/10 text-accent"
              : "text-foreground/70 hover:bg-black/[0.06]"
          )}
        >
          <LayoutGrid className="h-6 w-6" />
        </button>

        {/* Open window tabs */}
        {openWindows.map(([id, win]) => {
          const config = windowConfigs[id];
          const Icon = config.icon;
          const isActive = state.activeWindowId === id;

          return (
            <button
              key={id}
              onClick={() => {
                if (win.isMinimized) {
                  openWindow(id);
                } else {
                  focusWindow(id);
                }
              }}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-md transition-colors",
                isActive
                  ? "bg-accent/10 text-accent"
                  : win.isMinimized
                    ? "text-foreground/40 hover:bg-black/[0.06]"
                    : "text-foreground/60 hover:bg-black/[0.06]"
              )}
              title={config.title}
            >
              <Icon className="h-5.5 w-5.5" />
              {/* Win11-style active indicator line */}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full bg-accent" />
              )}
              {!isActive && win.isOpen && !win.isMinimized && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-1.5 rounded-full bg-foreground/30" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: system tray */}
      <div className="flex-1 flex justify-end">
        <SystemTray />
      </div>
    </div>
  );
}
