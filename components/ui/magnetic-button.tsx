"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  href,
  target,
  rel,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isPointerFine] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches
  );

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });
  const isInternalLink =
    typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !isPointerFine) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div style={{ x, y }}>
        {href ? (
          isInternalLink ? (
            <Link href={href} onClick={onClick} className={className}>
              {children}
            </Link>
          ) : (
            <a href={href} target={target} rel={rel} onClick={onClick} className={className}>
              {children}
            </a>
          )
        ) : (
          <button type="button" onClick={onClick} className={className}>
            {children}
          </button>
        )}
      </motion.div>
    </div>
  );
}
