"use client";

import { education, certifications } from "@/content/education";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateIn } from "@/components/motion/animate-in";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading>Education</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 space-y-12"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.school}
              variants={fadeInUp}
              className="grid gap-4 md:grid-cols-[200px_1fr]"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-accent">
                  {edu.expected}
                </p>
                {edu.gpa && (
                  <p className="mt-1 text-xs text-muted">GPA: {edu.gpa}</p>
                )}
              </div>

              <div className="border-l border-line pl-6">
                <h3 className="font-heading text-lg font-semibold">
                  {edu.degree}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{edu.school}</p>

                {edu.honors && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {edu.honors.map((honor) => (
                      <span
                        key={honor}
                        className="inline-flex items-center gap-1 border border-accent/30 px-2 py-0.5 text-xs text-accent"
                      >
                        <Award size={10} />
                        {honor}
                      </span>
                    ))}
                  </div>
                )}

                {edu.coursework && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-widest text-muted">
                      Relevant Coursework
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {edu.coursework.join(" · ")}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimateIn className="mt-14">
          <p className="text-xs uppercase tracking-widest text-muted">
            Certifications
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 border border-line bg-surface px-4 py-2 text-sm"
              >
                <Award size={14} className="text-accent" />
                {cert}
              </span>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
