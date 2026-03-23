"use client";

import { AnimateIn } from "@/components/motion/animate-in";
import { fadeIn } from "@/lib/animations";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <AnimateIn variants={fadeIn} className={className}>
      <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
        {children}
      </h2>
      <div className="mt-4 h-px w-12 bg-accent" />
    </AnimateIn>
  );
}
