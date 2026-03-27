"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDesktop } from "./desktop-context";
import { windowConfigs, type WindowId } from "@/content/desktop";

const TASKBAR_HEIGHT = 56;

type ResizeEdge =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

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
    resizeWindow,
  } = useDesktop();

  const win = state.windows[id];
  const config = windowConfigs[id];
  const isActive = state.activeWindowId === id;
  const Icon = config.icon;

  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  // Resize state
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef({
    edge: "" as ResizeEdge,
    startX: 0,
    startY: 0,
    startW: 0,
    startH: 0,
    startPosX: 0,
    startPosY: 0,
  });

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

  // Track if we need to un-maximize on drag
  const pendingUnmaximizeRef = useRef(false);

  // Drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;
    e.preventDefault();

    if (win.isMaximized) {
      // Mark that we should un-maximize once the user starts moving
      pendingUnmaximizeRef.current = true;
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        posX: 0,
        posY: 0,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      return;
    }

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
    // Handle un-maximize on drag start
    if (pendingUnmaximizeRef.current) {
      const dx = Math.abs(e.clientX - dragStartRef.current.x);
      const dy = Math.abs(e.clientY - dragStartRef.current.y);
      if (dx > 4 || dy > 4) {
        // Un-maximize and position window so the cursor is centered on title bar
        pendingUnmaximizeRef.current = false;
        maximizeWindow(id); // toggles off
        const newX = e.clientX - win.size.width / 2;
        const newY = e.clientY - 18; // roughly center of title bar
        moveWindow(id, { x: Math.max(0, newX), y: Math.max(0, newY) });
        dragStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          posX: Math.max(0, newX),
          posY: Math.max(0, newY),
        };
        setIsDragging(true);
      }
      return;
    }

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
    pendingUnmaximizeRef.current = false;
  };

  // Resize handlers
  const onResizePointerDown = useCallback(
    (edge: ResizeEdge) => (e: React.PointerEvent) => {
      if (isMobile || win.isMaximized) return;
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      resizeRef.current = {
        edge,
        startX: e.clientX,
        startY: e.clientY,
        startW: win.size.width,
        startH: win.size.height,
        startPosX: win.position.x,
        startPosY: win.position.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [isMobile, win.isMaximized, win.size.width, win.size.height, win.position.x, win.position.y]
  );

  const onResizePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isResizing) return;
      const { edge, startX, startY, startW, startH, startPosX, startPosY } =
        resizeRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const minW = config.minSize.width;
      const minH = config.minSize.height;

      let newW = startW;
      let newH = startH;
      let newX = startPosX;
      let newY = startPosY;

      if (edge.includes("right")) {
        newW = Math.max(minW, startW + dx);
      }
      if (edge.includes("left")) {
        const proposedW = startW - dx;
        if (proposedW >= minW) {
          newW = proposedW;
          newX = startPosX + dx;
        }
      }
      if (edge.includes("bottom")) {
        newH = Math.max(minH, startH + dy);
      }
      if (edge === "top" || edge === "top-left" || edge === "top-right") {
        const proposedH = startH - dy;
        if (proposedH >= minH) {
          newH = proposedH;
          newY = startPosY + dy;
        }
      }

      resizeWindow(id, { width: newW, height: newH });
      if (newX !== startPosX || newY !== startPosY) {
        moveWindow(id, { x: newX, y: newY });
      }
    },
    [isResizing, id, config.minSize, resizeWindow, moveWindow]
  );

  const onResizePointerUp = useCallback(() => {
    setIsResizing(false);
  }, []);

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

  const showResizeHandles = !isMobile && !win.isMaximized;

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          style={windowStyle}
          className={cn(
            "flex flex-col overflow-hidden rounded-lg border border-black/[0.08] bg-surface",
            isActive
              ? "shadow-xl shadow-black/10"
              : "shadow-md shadow-black/5 opacity-[0.97]"
          )}
          onPointerDown={() => focusWindow(id)}
        >
          {/* ── Title Bar ─────────────────────────────── */}
          <div
            ref={dragRef}
            className={cn(
              "flex shrink-0 items-center justify-between border-b border-black/[0.06] px-4 h-11 select-none",
              !isMobile && "cursor-grab",
              isDragging && "cursor-grabbing"
            )}
            style={{
              background: isActive
                ? "var(--surface)"
                : "var(--surface-elevated)",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {/* Left: Icon + Title */}
            <div className="flex min-w-0 items-center gap-2.5">
              <Icon className="h-4.5 w-4.5 shrink-0 text-foreground/50" />
              <span className="truncate text-sm font-medium text-foreground/80">
                {config.title}
              </span>
            </div>

            {/* Right: Window controls (Win11 style) */}
            <div className="flex items-center h-full -mr-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                className="flex h-full w-12 items-center justify-center transition-colors hover:bg-black/[0.06]"
                aria-label="Minimize"
              >
                <Minus className="h-4.5 w-4.5 text-foreground/60" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  maximizeWindow(id);
                }}
                className="flex h-full w-12 items-center justify-center transition-colors hover:bg-black/[0.06]"
                aria-label="Maximize"
              >
                {win.isMaximized ? (
                  <Minimize2 className="h-4 w-4 text-foreground/60" />
                ) : (
                  <Maximize2 className="h-4 w-4 text-foreground/60" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                className="flex h-full w-12 items-center justify-center transition-colors hover:bg-[#c42b1c] hover:text-white rounded-tr-lg"
                aria-label="Close"
              >
                <X className="h-4.5 w-4.5 text-foreground/60 hover:text-inherit" />
              </button>
            </div>
          </div>

          {/* ── Window Body ───────────────────────────── */}
          <div className="relative flex-1 overflow-x-hidden overflow-y-auto bg-surface-elevated">
            {children}
          </div>

          {/* ── Resize Handles ────────────────────────── */}
          {showResizeHandles && (
            <>
              {/* Edges */}
              <div
                className="absolute top-0 left-2 right-2 h-1 cursor-n-resize"
                onPointerDown={onResizePointerDown("top")}
                onPointerMove={onResizePointerMove}
                onPointerUp={onResizePointerUp}
              />
              <div
                className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize"
                onPointerDown={onResizePointerDown("bottom")}
                onPointerMove={onResizePointerMove}
                onPointerUp={onResizePointerUp}
              />
              <div
                className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize"
                onPointerDown={onResizePointerDown("left")}
                onPointerMove={onResizePointerMove}
                onPointerUp={onResizePointerUp}
              />
              <div
                className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize"
                onPointerDown={onResizePointerDown("right")}
                onPointerMove={onResizePointerMove}
                onPointerUp={onResizePointerUp}
              />
              {/* Corners */}
              <div
                className="absolute top-0 left-0 h-3 w-3 cursor-nw-resize"
                onPointerDown={onResizePointerDown("top-left")}
                onPointerMove={onResizePointerMove}
                onPointerUp={onResizePointerUp}
              />
              <div
                className="absolute top-0 right-0 h-3 w-3 cursor-ne-resize"
                onPointerDown={onResizePointerDown("top-right")}
                onPointerMove={onResizePointerMove}
                onPointerUp={onResizePointerUp}
              />
              <div
                className="absolute bottom-0 left-0 h-3 w-3 cursor-sw-resize"
                onPointerDown={onResizePointerDown("bottom-left")}
                onPointerMove={onResizePointerMove}
                onPointerUp={onResizePointerUp}
              />
              <div
                className="absolute bottom-0 right-0 h-3 w-3 cursor-se-resize"
                onPointerDown={onResizePointerDown("bottom-right")}
                onPointerMove={onResizePointerMove}
                onPointerUp={onResizePointerUp}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
