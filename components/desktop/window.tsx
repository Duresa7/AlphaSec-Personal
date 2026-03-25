"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/ui/status-pill";
import { useDesktop } from "./desktop-context";
import { windowConfigs, type WindowId } from "@/content/desktop";

const TASKBAR_HEIGHT = 48;

interface DesktopWindowProps {
  id: WindowId;
  children: React.ReactNode;
}

export function DesktopWindow({ id, children }: DesktopWindowProps) {
  const {
    state,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
  } = useDesktop();

  const win = state.windows[id];
  const config = windowConfigs[id];
  const isActive = state.activeWindowId === id;
  const Icon = config.icon;

  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  // Window positioning
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = viewport.w < 768;

  // Drag handlers (pointer events for better mobile support)
  const onPointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;
    if (win.isMaximized) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: win.position.x,
      posY: win.position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const newX = Math.max(
      -win.size.width + 100,
      Math.min(viewport.w - 100, dragStartRef.current.posX + dx)
    );
    const newY = Math.max(
      0,
      Math.min(
        viewport.h - TASKBAR_HEIGHT - 40,
        dragStartRef.current.posY + dy
      )
    );
    moveWindow(id, { x: newX, y: newY });
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  if (!win.isOpen) return null;

  // Compute style
  const windowStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        inset: 0,
        bottom: TASKBAR_HEIGHT,
        width: "100%",
        height: `calc(100% - ${TASKBAR_HEIGHT}px)`,
        zIndex: win.zIndex,
      }
    : win.isMaximized
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
          zIndex: win.zIndex,
        }
      : {
          position: "fixed",
          top: win.position.y,
          left: win.position.x,
          width: win.size.width,
          height: win.size.height,
          zIndex: win.zIndex,
        };

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={windowStyle}
          className={cn(
            "flex flex-col overflow-hidden border border-line/80 bg-background shadow-2xl",
            isActive
              ? "ring-1 ring-accent/30"
              : "ring-1 ring-transparent opacity-95"
          )}
          onPointerDown={() => focusWindow(id)}
        >
          {/* ── Title Bar ─────────────────────────────── */}
          <div
            ref={dragRef}
            className={cn(
              "flex shrink-0 items-center justify-between border-b border-line/80 px-3 py-2 select-none",
              !isMobile && !win.isMaximized && "cursor-grab",
              isDragging && "cursor-grabbing"
            )}
            style={{
              background: isActive
                ? "var(--surface)"
                : "color-mix(in srgb, var(--surface) 60%, var(--background))",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {/* Window controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(id);
                  }}
                  className="group flex h-3 w-3 items-center justify-center rounded-full border border-red-500/40 bg-red-500/80 transition-colors hover:bg-red-500"
                  aria-label="Close"
                >
                  <X className="h-1.5 w-1.5 text-red-900 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(id);
                  }}
                  className="group flex h-3 w-3 items-center justify-center rounded-full border border-yellow-500/40 bg-yellow-500/80 transition-colors hover:bg-yellow-500"
                  aria-label="Minimize"
                >
                  <Minus className="h-1.5 w-1.5 text-yellow-900 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    maximizeWindow(id);
                  }}
                  className="group flex h-3 w-3 items-center justify-center rounded-full border border-green-500/40 bg-green-500/80 transition-colors hover:bg-green-500"
                  aria-label="Maximize"
                >
                  {win.isMaximized ? (
                    <Minimize2 className="h-1.5 w-1.5 text-green-900 opacity-0 group-hover:opacity-100" />
                  ) : (
                    <Maximize2 className="h-1.5 w-1.5 text-green-900 opacity-0 group-hover:opacity-100" />
                  )}
                </button>
              </div>

              <div className="flex min-w-0 items-center gap-2">
                <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="ui-mono-label truncate text-foreground/80">
                  {config.title}
                </span>
              </div>
            </div>

            <StatusPill status={isActive ? "active" : "default"}>
              {isActive ? "focused" : "idle"}
            </StatusPill>
          </div>

          {/* ── Window Body ───────────────────────────── */}
          <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
