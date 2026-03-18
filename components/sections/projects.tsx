"use client";

import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading>Projects</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 space-y-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={fadeInUp}
              className="border border-line bg-surface p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{project.period}</p>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-muted transition-colors hover:text-foreground"
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
                    className="border border-line px-2 py-0.5 text-xs text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="mt-5 space-y-3">
                {project.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-line"
                  >
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
