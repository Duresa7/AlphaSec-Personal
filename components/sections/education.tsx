"use client";

import { education, certifications } from "@/content/education";
import { SectionDivider } from "@/components/ui/section-divider";
import { StatusPill } from "@/components/ui/status-pill";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionDivider label="education" step="04" status="training path" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.school}
              variants={fadeInUp}
              className="network-panel p-6 transition-colors hover:border-accent/30"
            >
              <p className="ui-mono-label text-accent">
                {edu.expected}
              </p>

              <h3 className="mt-3 font-heading text-lg font-semibold">
                {edu.degree}
              </h3>
              <p className="ui-mono-meta mt-1 text-muted">
                {edu.school}
              </p>

              {edu.gpa && (
                <p className="ui-mono-meta mt-2 text-muted/60">
                  GPA: {edu.gpa}
                </p>
              )}

              {edu.honors && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {edu.honors.map((honor) => (
                    <StatusPill key={honor} status="active">
                      {honor}
                    </StatusPill>
                  ))}
                </div>
              )}

              {edu.coursework && (
                <div className="mt-4">
                  <p className="ui-mono-label text-muted/50">
                    coursework
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="ui-mono-chip border border-line bg-background/55 px-3 py-1.5 text-muted transition-all hover:border-accent/50 hover:text-foreground"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <TerminalPanel
          title="credential store"
          subtitle="validated certifications"
          status="synced"
          className="mt-14"
        >
          <div className="flex flex-wrap gap-3 p-6">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="ui-mono-body inline-flex items-center gap-2 border border-line px-4 py-2.5 transition-colors hover:border-accent/30"
              >
                <Shield size={14} className="text-accent" />
                {cert}
              </span>
            ))}
          </div>
        </TerminalPanel>
      </div>
    </section>
  );
}
