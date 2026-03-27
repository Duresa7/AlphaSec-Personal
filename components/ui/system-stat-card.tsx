"use client";

import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/ui/status-pill";

interface SystemStatCardProps {
  label: string;
  value: string;
  meta?: string;
  status?: string;
  className?: string;
}

export function SystemStatCard({
  label,
  value,
  meta,
  status,
  className,
}: SystemStatCardProps) {
  return (
    <div className={cn("network-panel px-4 py-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-muted">
          {label}
        </p>
        {status && (
          <StatusPill status="active" className="shrink-0">
            {status}
          </StatusPill>
        )}
      </div>
      <p className="mt-3 font-heading text-xl leading-tight text-foreground">
        {value}
      </p>
      {meta && (
        <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
          {meta}
        </p>
      )}
    </div>
  );
}
