"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

const sectionIds = [
  "hero",
  "about",
  "testimonials",
  "experience",
  "education",
  "skills",
  "projects",
  "work-examples-preview",
  "contact",
];

export function ScrollDownIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      // Hide when near the bottom of the page
      setVisible(docHeight - scrollBottom > 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToNext = useCallback(() => {
    const scrollY = window.scrollY;
    const offset = 80; // navbar height

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      if (top > scrollY + 10) {
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
    }
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={scrollToNext}
      aria-label="Scroll to next section"
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 border border-line bg-surface/90 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted backdrop-blur-sm transition-all hover:border-accent hover:text-accent"
    >
      scroll
      <ChevronDown size={14} className="animate-bounce" />
    </button>
  );
}
