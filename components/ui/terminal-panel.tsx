"use client";

import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/ui/status-pill";

interface TerminalPanelProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  status?: string;
  chrome?: boolean;
  className?: string;
  bodyClassName?: string;
}

export function TerminalPanel({
  children,
  title,
  subtitle,
  status,
  chrome = true,
  className,
  bodyClassName,
}: TerminalPanelProps) {
  return (
    <div className={cn("network-panel", className)}>
      {chrome && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <div className="min-w-0">
            {title && (
              <p className="text-xs font-medium truncate text-foreground/80">
                {title}
              </p>
            )}
            {subtitle && (
              <p className="text-[11px] truncate text-muted/60 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {status && <StatusPill status="active">{status}</StatusPill>}
        </div>
      )}
      <div className={cn("relative z-10", bodyClassName)}>{children}</div>
    </div>
  );
}
