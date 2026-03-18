"use client";

import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateIn } from "@/components/motion/animate-in";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading>Experience</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 space-y-16"
        >
          {experience.map((job) => (
            <motion.div
              key={job.company}
              variants={fadeInUp}
              className="grid gap-4 md:grid-cols-[200px_1fr]"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-accent">
                  {job.period}
                </p>
                <p className="mt-1 text-xs text-muted">{job.location}</p>
              </div>

              <div className="border-l border-line pl-6">
                <h3 className="font-heading text-lg font-semibold">
                  {job.role}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{job.company}</p>

                <ul className="mt-4 space-y-3">
                  {job.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-line"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
