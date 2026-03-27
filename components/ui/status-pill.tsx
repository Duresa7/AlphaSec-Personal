"use client";

import { cn } from "@/lib/utils";

interface StatusPillProps {
  children: React.ReactNode;
  status?: "default" | "active" | "warning";
  className?: string;
}

const statusStyles = {
  default:
    "border-line text-muted bg-background/60",
  active:
    "border-accent/25 text-accent bg-accent/[0.06]",
  warning:
    "border-warning/30 text-warning bg-warning/[0.06]",
};

export function StatusPill({
  children,
  status = "default",
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "ui-mono-label inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px]",
        statusStyles[status],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
