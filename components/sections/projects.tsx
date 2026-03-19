"use client";

import { projects } from "@/content/projects";
import { SectionDivider } from "@/components/ui/section-divider";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionDivider label="projects" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 space-y-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={fadeInUp}
              className="group border border-line p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_20px_var(--accent-dim)] md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-muted/60">
                    {project.period}
                  </p>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-muted transition-colors hover:text-accent"
                    aria-label={`View ${project.name}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-accent/20 px-2 py-0.5 font-mono text-[11px] text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="mt-5 space-y-3">
                {project.bullets.map((bullet, i) => (
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
