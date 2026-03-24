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
        <div className="mt-8 flex items-center gap-3 font-mono text-[11px]">
          <span className="text-muted/40">view:</span>
          <button
            onClick={() => setView("list")}
            className={`border px-3 py-1.5 uppercase tracking-widest transition-colors ${
              view === "list"
                ? "border-accent/40 text-accent bg-accent-dim/30"
                : "border-line text-muted hover:border-accent/20 hover:text-foreground"
            }`}
          >
            ls
          </button>
          <button
            onClick={() => setView("scan")}
            className={`border px-3 py-1.5 uppercase tracking-widest transition-colors ${
              view === "scan"
                ? "border-accent/40 text-accent bg-accent-dim/30"
                : "border-line text-muted hover:border-accent/20 hover:text-foreground"
            }`}
          >
            nmap
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
                <TerminalPanel
                  title={`~/${slugify(category.label)}`}
                  subtitle="ls --modules"
                  status="mounted"
                  chrome={false}
                  bodyClassName="p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[11px] text-muted">
                      <span className="text-accent">~/{slugify(category.label)}</span>
                      <span className="text-muted/40"> $ </span>
                      <span className="text-muted/60">ls</span>
                    </p>
                    <StatusPill>loaded</StatusPill>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="border border-line bg-background/55 px-3 py-1.5 font-mono text-xs text-muted transition-all hover:border-accent/50 hover:text-foreground hover:shadow-[0_0_12px_var(--accent-dim)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </TerminalPanel>
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
