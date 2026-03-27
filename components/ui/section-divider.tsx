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
      <div className="hidden h-px flex-1 bg-line md:block" />
      <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-2.5 md:flex-none">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
          {step ?? "—"}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {label}
          </p>
        </div>
      </div>
      <div className="hidden h-px flex-1 bg-line md:block" />
    </motion.div>
  );
}
