"use client";

import { useState } from "react";
import { experience } from "@/content/experience";
import { SectionDivider } from "@/components/ui/section-divider";
import { StatusPill } from "@/components/ui/status-pill";
import { SystemctlTimeline } from "@/components/ui/systemctl-timeline";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

export function Experience() {
  const [view, setView] = useState<"timeline" | "systemctl">("timeline");

  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionDivider label="experience" step="03" status="ops timeline" />

        {/* View toggle */}
        <div className="ui-mono-meta mt-8 flex items-center gap-3">
          <span className="text-muted/40">view:</span>
          <button
            onClick={() => setView("timeline")}
            className={`ui-mono-label border px-3 py-1.5 transition-colors ${
              view === "timeline"
                ? "border-accent/40 text-accent bg-accent-dim/30"
                : "border-line text-muted hover:border-accent/20 hover:text-foreground"
            }`}
          >
            timeline
          </button>
          <button
            onClick={() => setView("systemctl")}
            className={`ui-mono-label border px-3 py-1.5 transition-colors ${
              view === "systemctl"
                ? "border-accent/40 text-accent bg-accent-dim/30"
                : "border-line text-muted hover:border-accent/20 hover:text-foreground"
            }`}
          >
            systemctl
          </button>
        </div>

        {view === "timeline" ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative mt-8"
          >
            <div className="vertical-route-line absolute bottom-0 left-[13px] top-0 hidden w-px lg:block" />

            <div className="space-y-16">
              {experience.map((job, index) => (
                <motion.div
                  key={job.company}
                  variants={fadeInUp}
                  className="relative lg:pl-12"
                >
                  <div className="route-node absolute -left-[40px] top-3 hidden lg:block" />

                  <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
                  <div>
                    <p className="ui-mono-label text-accent">
                      {job.period}
                    </p>
                    <p className="ui-mono-meta mt-2 text-muted/70">
                      {job.location}
                    </p>
                  </div>

                  <div className="network-panel p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-heading text-lg font-semibold">
                          {job.role}
                        </h3>
                        <p className="mt-1 font-mono text-sm text-muted">
                          {job.company}
                        </p>
                      </div>
                      <StatusPill status="active">
                        node {String(index + 1).padStart(2, "0")}
                      </StatusPill>
                    </div>

                    <div className="mt-5 route-track h-4" />

                    <ul className="mt-5 max-w-2xl space-y-3">
                      {job.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="relative pl-5 text-sm leading-relaxed text-muted"
                        >
                          <span className="absolute left-0 top-0 font-mono text-accent/50">
                            &gt;
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="mt-8">
            <SystemctlTimeline />
          </div>
        )}
      </div>
    </section>
  );
}
