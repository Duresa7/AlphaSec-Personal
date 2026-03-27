"use client";

import { useState } from "react";
import { skills } from "@/content/skills";
import { SectionDivider } from "@/components/ui/section-divider";
import { StatusPill } from "@/components/ui/status-pill";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { NmapScanCard } from "@/components/ui/nmap-scan-card";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function Skills() {
  const [view, setView] = useState<"list" | "scan">("list");

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionDivider label="skills" step="05" status="module inventory" />

        {/* View toggle */}
        <div className="mt-8 flex items-center gap-2">
          <button
            onClick={() => setView("list")}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              view === "list"
                ? "border-accent bg-accent text-white"
                : "border-line text-muted hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView("scan")}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              view === "scan"
                ? "border-accent bg-accent text-white"
                : "border-line text-muted hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            Scan
          </button>
        </div>

        {view === "list" ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 space-y-10"
          >
            {skills.map((category) => (
              <motion.div key={category.label} variants={fadeInUp}>
                <div className="network-panel p-5">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="text-sm font-semibold text-foreground">
                      {category.label}
                    </h3>
                    <StatusPill>{category.items.length} skills</StatusPill>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-line bg-background/70 px-3 py-1.5 text-[13px] text-foreground/80 transition-all hover:border-accent/40 hover:bg-accent/[0.04] hover:text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mt-8">
            <NmapScanCard />
          </div>
        )}
      </div>
    </section>
  );
}
