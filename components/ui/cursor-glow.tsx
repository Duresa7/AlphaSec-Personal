"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerFine) return;

    const glow = glowRef.current;
    if (!glow) return;

    glow.style.opacity = "1";

    const handleMouseMove = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[1] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500"
      style={{
        width: 500,
        height: 500,
        background:
          "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
