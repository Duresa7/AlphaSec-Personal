"use client";

import { Shield } from "lucide-react";
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
    <div className="fixed inset-x-0 bottom-0 z-[60] flex h-12 items-center border-t border-line/80 bg-surface/95 px-2 backdrop-blur-md">
      {/* Start button */}
      <button
        onClick={onStartMenuToggle}
        className={cn(
          "mr-2 flex h-8 items-center gap-1.5 rounded px-2.5 transition-colors",
          startMenuOpen
            ? "bg-accent-dim/50 text-accent"
            : "text-muted hover:bg-accent-dim/30 hover:text-accent"
        )}
      >
        <Shield className="h-4 w-4" />
        <span className="ui-mono-label hidden text-[10px] sm:block">
          alphasec
        </span>
      </button>

      {/* Separator */}
      <div className="mx-1 h-5 w-px bg-line/60" />

      {/* Open window tabs */}
      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
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
                "flex h-8 max-w-[160px] items-center gap-1.5 rounded px-2 transition-all",
                isActive
                  ? "bg-accent-dim/40 text-accent"
                  : win.isMinimized
                    ? "text-muted/50 hover:bg-surface-elevated/60 hover:text-muted"
                    : "text-muted hover:bg-surface-elevated/60 hover:text-foreground"
              )}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span className="ui-mono-label truncate text-[10px]">
                {config.title}
              </span>
              {isActive && (
                <span className="ml-auto h-1 w-1 shrink-0 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* System tray */}
      <div className="ml-2 shrink-0 border-l border-line/60 pl-2">
        <SystemTray />
      </div>
    </div>
  );
}
