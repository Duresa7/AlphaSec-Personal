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
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/80 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-line/70 bg-background/90" />
              <span className="h-2.5 w-2.5 rounded-full border border-line/70 bg-background/90" />
              <span className="h-2.5 w-2.5 rounded-full border border-line/70 bg-background/90" />
            </div>
            <div className="min-w-0">
              {title && (
                <p className="ui-mono-label truncate text-foreground/86">
                  {title}
                </p>
              )}
              {subtitle && (
                <p className="ui-mono-meta truncate text-muted/70">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {status && <StatusPill status="active">{status}</StatusPill>}
        </div>
      )}
      <div className={cn("relative z-10", bodyClassName)}>{children}</div>
    </div>
  );
}
