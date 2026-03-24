"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface SectionDividerProps {
  label: string;
  step?: string;
  status?: string;
  animate?: boolean;
  className?: string;
}

export function SectionDivider({
  label,
  step,
  status,
  animate = true,
  className = "",
}: SectionDividerProps) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`relative flex items-center gap-4 ${className}`}
    >
      <div className="hidden h-px flex-1 bg-line/80 md:block" />
      <div className="network-panel flex min-w-0 flex-1 items-center gap-4 px-4 py-3 md:flex-none md:min-w-[340px]">
        <div className="flex items-center gap-3">
          <span className="ui-mono-label text-accent">
            {step ?? "hop"}
          </span>
          <span className="route-node" />
        </div>

        <div className="min-w-0">
          <p className="ui-mono-label text-foreground/90">
            {label}
          </p>
          <p className="ui-mono-meta mt-1 text-muted/70">
            {status ?? "route synchronized"}
          </p>
        </div>

        <div className={`route-track ml-auto hidden h-4 min-w-24 flex-1 md:block ${animate ? "" : "after:hidden"}`} />
      </div>
      <div className="hidden h-px flex-1 bg-line/80 md:block" />
    </motion.div>
  );
}
