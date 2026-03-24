"use client";

import { cn } from "@/lib/utils";

interface StatusPillProps {
  children: React.ReactNode;
  status?: "default" | "active" | "warning";
  className?: string;
}

const statusStyles = {
  default:
    "border-line/80 text-muted bg-background/55",
  active:
    "border-accent/35 text-accent bg-accent-dim/70",
  warning:
    "border-warning/40 text-warning bg-warning/10",
};

export function StatusPill({
  children,
  status = "default",
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "ui-mono-label inline-flex items-center gap-2 border px-2.5 py-1",
        statusStyles[status],
        className
      )}
    >
      <span className="h-1.5 w-1.5 bg-current" />
      {children}
    </span>
  );
}
