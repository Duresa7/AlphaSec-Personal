"use client";

import { education, certifications } from "@/content/education";
import { SectionDivider } from "@/components/ui/section-divider";
import { AnimateIn } from "@/components/motion/animate-in";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionDivider label="education" />

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
              className="border border-line p-6 transition-colors hover:border-accent/30"
            >
              <p className="font-mono text-xs text-accent">{edu.expected}</p>

              <h3 className="mt-3 font-heading text-lg font-semibold">
                {edu.degree}
              </h3>
              <p className="mt-1 font-mono text-[12px] text-muted">
                {edu.school}
              </p>

              {edu.gpa && (
                <p className="mt-2 font-mono text-[11px] text-muted/60">
                  GPA: {edu.gpa}
                </p>
              )}

              {edu.honors && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {edu.honors.map((honor) => (
                    <span
                      key={honor}
                      className="inline-flex items-center gap-1 border border-accent/30 px-2 py-0.5 font-mono text-[11px] text-accent"
                    >
                      {honor}
                    </span>
                  ))}
                </div>
              )}

              {edu.coursework && (
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted/50">
                    coursework
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <code
                        key={course}
                        className="bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {course}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <AnimateIn className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted/50">
            // certifications
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-sm transition-colors hover:border-accent/30"
              >
                <Shield size={14} className="text-accent" />
                {cert}
              </span>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
