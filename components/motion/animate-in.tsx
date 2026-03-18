"use client";

import { motion } from "framer-motion";
import type { Variants, HTMLMotionProps } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface AnimateInProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}

export function AnimateIn({
  variants = fadeInUp,
  className,
  children,
  ...props
}: AnimateInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
