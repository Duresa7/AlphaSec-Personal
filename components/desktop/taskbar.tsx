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

const taskbarButtonClassName =
  "relative flex h-11 w-11 items-center justify-center rounded-md transition-colors";

interface TaskbarWindowButtonProps {
  id: WindowId;
  isActive: boolean;
  isMinimized: boolean;
  title: string;
  onActivate: () => void;
}

function TaskbarWindowButton({
  id,
  isActive,
  isMinimized,
  title,
  onActivate,
}: TaskbarWindowButtonProps) {
  const Icon = windowConfigs[id].icon;

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-label={title}
      className={cn(
        taskbarButtonClassName,
        isActive
          ? "bg-accent/10 text-accent"
          : isMinimized
            ? "text-foreground/40 hover:bg-black/[0.06]"
            : "text-foreground/60 hover:bg-black/[0.06]"
      )}
      title={title}
    >
      <Icon className="h-5.5 w-5.5" />
      {isActive && (
        <span className="absolute bottom-1 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-accent" />
      )}
      {!isActive && !isMinimized && (
        <span className="absolute bottom-1 left-1/2 h-[3px] w-1.5 -translate-x-1/2 rounded-full bg-foreground/30" />
      )}
    </button>
  );
}

export function Taskbar({ onStartMenuToggle, startMenuOpen }: TaskbarProps) {
  const { state, openWindow, focusWindow } = useDesktop();

  const openWindows = (Object.entries(state.windows) as [WindowId, typeof state.windows[WindowId]][])
    .filter(([, win]) => win.isOpen);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] flex h-14 items-center border-t border-black/[0.06] bg-white/70 px-3 backdrop-blur-xl"
      role="toolbar"
      aria-label="Desktop taskbar"
    >
      {/* Left spacer */}
      <div className="flex-1" />

      {/* Center: start button + open window icons */}
      <div className="flex items-center gap-1">
        {/* Start button */}
        <button
          type="button"
          onClick={onStartMenuToggle}
          aria-label="Toggle start menu"
          aria-pressed={startMenuOpen}
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
          const isActive = state.activeWindowId === id;

          return (
            <TaskbarWindowButton
              key={id}
              id={id}
              isActive={isActive}
              isMinimized={win.isMinimized}
              title={config.title}
              onActivate={() => {
                if (win.isMinimized) {
                  openWindow(id);
                  return;
                }

                focusWindow(id);
              }}
            />
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
