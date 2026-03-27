"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Wifi, Volume2 } from "lucide-react";

const subscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function SystemTray() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const mounted = useMounted();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2.5">
      {/* Network indicator */}
      <div className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-black/[0.06] transition-colors">
        <Wifi className="h-4.5 w-4.5 text-foreground/60" />
      </div>

      {/* Volume */}
      <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md hover:bg-black/[0.06] transition-colors">
        <Volume2 className="h-4.5 w-4.5 text-foreground/60" />
      </div>

      {/* Clock + Date */}
      <div className="flex flex-col items-end rounded-md px-2.5 py-1.5 hover:bg-black/[0.06] transition-colors cursor-default">
        <span className="text-[13px] font-medium leading-tight text-foreground/80">
          {time}
        </span>
        <span className="text-[11px] leading-tight text-foreground/50">
          {date}
        </span>
      </div>
    </div>
  );
}
