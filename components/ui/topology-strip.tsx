"use client";

import { cn } from "@/lib/utils";

interface TopologyStripProps {
  nodes: string[];
  activeSegment?: number;
  variant?: "compact" | "full";
  className?: string;
}

export function TopologyStrip({
  nodes,
  activeSegment = 0,
  variant = "full",
  className,
}: TopologyStripProps) {
  const compact = variant === "compact";

  return (
    <div
      className={cn(
        "network-panel px-4 py-4",
        compact ? "bg-transparent" : "",
        className
      )}
    >
      <div className="route-track flex flex-wrap items-center gap-x-3 gap-y-4">
        {nodes.map((node, index) => (
          <div key={node} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="route-node" />
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.22em]",
                  index <= activeSegment + 1 ? "text-accent" : "text-muted/72"
                )}
              >
                {node}
              </span>
            </div>
            {index < nodes.length - 1 && (
              <div className="route-track hidden h-4 w-14 sm:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
