"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import { type WindowId, windowConfigs } from "@/content/desktop";

/* ── State shape ─────────────────────────────────────── */

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface DesktopState {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  topZIndex: number;
  bootComplete: boolean;
}

/* ── Actions ─────────────────────────────────────────── */

type DesktopAction =
  | { type: "OPEN_WINDOW"; id: WindowId }
  | { type: "CLOSE_WINDOW"; id: WindowId }
  | { type: "MINIMIZE_WINDOW"; id: WindowId }
  | { type: "MAXIMIZE_WINDOW"; id: WindowId }
  | { type: "FOCUS_WINDOW"; id: WindowId }
  | { type: "MOVE_WINDOW"; id: WindowId; position: { x: number; y: number } }
  | { type: "RESIZE_WINDOW"; id: WindowId; size: { width: number; height: number } }
  | { type: "SET_BOOT_COMPLETE" };

/* ── Helpers ─────────────────────────────────────────── */

function getSpawnPosition(index: number): { x: number; y: number } {
  const baseX = 120 + (index % 5) * 40;
  const baseY = 60 + (index % 5) * 36;
  return { x: baseX, y: baseY };
}

function buildInitialWindowState(): Record<WindowId, WindowState> {
  const windows = {} as Record<WindowId, WindowState>;
  for (const [id, config] of Object.entries(windowConfigs)) {
    windows[id as WindowId] = {
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 0, y: 0 },
      size: { ...config.defaultSize },
      zIndex: 0,
    };
  }
  return windows;
}

const initialState: DesktopState = {
  windows: buildInitialWindowState(),
  activeWindowId: null,
  topZIndex: 10,
  bootComplete: false,
};

/* ── Reducer ─────────────────────────────────────────── */

let spawnCounter = 0;

function desktopReducer(
  state: DesktopState,
  action: DesktopAction
): DesktopState {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const win = state.windows[action.id];
      if (win.isOpen && !win.isMinimized) {
        // Already open and visible — just focus
        const nextZ = state.topZIndex + 1;
        return {
          ...state,
          topZIndex: nextZ,
          activeWindowId: action.id,
          windows: {
            ...state.windows,
            [action.id]: { ...win, zIndex: nextZ },
          },
        };
      }
      const nextZ = state.topZIndex + 1;
      const config = windowConfigs[action.id];
      const pos = win.isOpen
        ? win.position
        : getSpawnPosition(spawnCounter++);
      return {
        ...state,
        topZIndex: nextZ,
        activeWindowId: action.id,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            isOpen: true,
            isMinimized: false,
            isMaximized: config.openMaximized !== false,
            position: pos,
            size: win.isOpen ? win.size : { ...config.defaultSize },
            zIndex: nextZ,
          },
        },
      };
    }

    case "CLOSE_WINDOW": {
      return {
        ...state,
        activeWindowId:
          state.activeWindowId === action.id ? null : state.activeWindowId,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
          },
        },
      };
    }

    case "MINIMIZE_WINDOW": {
      return {
        ...state,
        activeWindowId:
          state.activeWindowId === action.id ? null : state.activeWindowId,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            isMinimized: true,
          },
        },
      };
    }

    case "MAXIMIZE_WINDOW": {
      const win = state.windows[action.id];
      const nextZ = state.topZIndex + 1;
      return {
        ...state,
        topZIndex: nextZ,
        activeWindowId: action.id,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            isMaximized: !win.isMaximized,
            zIndex: nextZ,
          },
        },
      };
    }

    case "FOCUS_WINDOW": {
      const nextZ = state.topZIndex + 1;
      return {
        ...state,
        topZIndex: nextZ,
        activeWindowId: action.id,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            zIndex: nextZ,
          },
        },
      };
    }

    case "MOVE_WINDOW": {
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            position: action.position,
          },
        },
      };
    }

    case "RESIZE_WINDOW": {
      const cfg = windowConfigs[action.id];
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            size: {
              width: Math.max(cfg.minSize.width, action.size.width),
              height: Math.max(cfg.minSize.height, action.size.height),
            },
          },
        },
      };
    }

    case "SET_BOOT_COMPLETE": {
      return { ...state, bootComplete: true };
    }

    default:
      return state;
  }
}

/* ── Context ─────────────────────────────────────────── */

interface DesktopContextValue {
  state: DesktopState;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, position: { x: number; y: number }) => void;
  resizeWindow: (id: WindowId, size: { width: number; height: number }) => void;
  setBootComplete: () => void;
}

const DesktopContext = createContext<DesktopContextValue | null>(null);

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(desktopReducer, initialState);

  const openWindow = useCallback(
    (id: WindowId) => dispatch({ type: "OPEN_WINDOW", id }),
    []
  );
  const closeWindow = useCallback(
    (id: WindowId) => dispatch({ type: "CLOSE_WINDOW", id }),
    []
  );
  const minimizeWindow = useCallback(
    (id: WindowId) => dispatch({ type: "MINIMIZE_WINDOW", id }),
    []
  );
  const maximizeWindow = useCallback(
    (id: WindowId) => dispatch({ type: "MAXIMIZE_WINDOW", id }),
    []
  );
  const focusWindow = useCallback(
    (id: WindowId) => dispatch({ type: "FOCUS_WINDOW", id }),
    []
  );
  const moveWindow = useCallback(
    (id: WindowId, position: { x: number; y: number }) =>
      dispatch({ type: "MOVE_WINDOW", id, position }),
    []
  );
  const resizeWindow = useCallback(
    (id: WindowId, size: { width: number; height: number }) =>
      dispatch({ type: "RESIZE_WINDOW", id, size }),
    []
  );
  const setBootComplete = useCallback(
    () => dispatch({ type: "SET_BOOT_COMPLETE" }),
    []
  );

  return (
    <DesktopContext.Provider
      value={{
        state,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        moveWindow,
        resizeWindow,
        setBootComplete,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used within DesktopProvider");
  return ctx;
}
