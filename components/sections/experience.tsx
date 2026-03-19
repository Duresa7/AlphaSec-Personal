"use client";

import { experience } from "@/content/experience";
import { SectionDivider } from "@/components/ui/section-divider";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionDivider label="experience" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 relative"
        >
          {/* Vertical accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/20 hidden md:block" />

          <div className="space-y-16">
            {experience.map((job, index) => (
              <motion.div
                key={job.company}
                variants={fadeInUp}
                className="grid gap-4 md:grid-cols-[200px_1fr] md:pl-8 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-[-3px] top-1 h-[7px] w-[7px] bg-accent hidden md:block" />

                <div>
                  <p className="font-mono text-xs text-accent">
                    {job.period}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted/60">
                    {job.location}
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    {job.role}
                  </h3>
                  <p className="mt-0.5 font-mono text-sm text-muted">
                    {job.company}
                  </p>

                  <ul className="mt-4 space-y-3">
                    {job.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="relative pl-5 text-sm leading-relaxed text-muted"
                      >
                        <span className="absolute left-0 top-0 font-mono text-accent/40">
                          &gt;
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
