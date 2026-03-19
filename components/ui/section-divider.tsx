"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface SectionDividerProps {
  label: string;
  className?: string;
}

export function SectionDivider({ label, className = "" }: SectionDividerProps) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`relative flex items-center gap-4 ${className}`}
    >
      <div className="h-px flex-1 bg-line" />
      <span className="font-mono text-[11px] tracking-wider text-muted">
        // {label}
      </span>
      <div className="h-px flex-1 bg-line" />
    </motion.div>
  );
}
