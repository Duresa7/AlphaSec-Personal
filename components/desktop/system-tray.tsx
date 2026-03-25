"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Wifi, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function SystemTray() {
  const [time, setTime] = useState("");
  const [uptime, setUptime] = useState(0);
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setUptime((prev) => prev + 1);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-3">
      {/* Network indicator */}
      <div className="hidden items-center gap-1.5 sm:flex">
        <Wifi className="h-3 w-3 text-accent" />
        <span className="ui-mono-label text-[10px] text-muted/70">eth0</span>
      </div>

      {/* Uptime */}
      <span className="ui-mono-label hidden text-[10px] text-muted/60 md:block">
        up {formatUptime(uptime)}
      </span>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-accent-dim/40"
        aria-label="Toggle theme"
      >
        {mounted && theme === "dark" ? (
          <Sun className="h-3 w-3 text-muted" />
        ) : (
          <Moon className="h-3 w-3 text-muted" />
        )}
      </button>

      {/* Clock */}
      <span className="ui-mono-label min-w-[62px] text-right text-[11px] text-foreground/80">
        {time}
      </span>
    </div>
  );
}
