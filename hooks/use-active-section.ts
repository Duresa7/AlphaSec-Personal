"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "hero",
  "experience",
  "education",
  "skills",
  "projects",
  "contact",
];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return activeSection;
}
