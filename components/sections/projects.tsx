"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import { SectionDivider } from "@/components/ui/section-divider";
import { StatusPill } from "@/components/ui/status-pill";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { HomelabHtop } from "@/components/ui/homelab-htop";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

export function Projects() {
  const [htopOpen, setHtopOpen] = useState(false);

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionDivider label="projects" step="06" status="service records" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 space-y-8"
        >
          {projects.map((project) => (
            <motion.div key={project.name} variants={fadeInUp} className="group">
              <TerminalPanel
                title={project.name}
                subtitle={project.period}
                status="active scope"
                bodyClassName="p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/90">
                      {project.period}
                    </p>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-foreground/90 transition-colors hover:text-accent"
                      aria-label={`View ${project.name}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <StatusPill key={tech}>{tech}</StatusPill>
                  ))}
                </div>

                <ul className="mt-4 max-w-2xl space-y-2.5">
                  {project.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="relative pl-4 text-sm leading-relaxed text-foreground"
                    >
                      <span className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-accent/50" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {project.diagramUrl && (
                  <div className="mt-6">
                    <p className="mb-3 text-xs font-medium text-foreground/90">
                      Network diagram
                    </p>
                    <div className="overflow-hidden border border-line">
                      <iframe
                        src={project.diagramUrl}
                        style={{ width: "100%", height: "600px", border: "none" }}
                        title={`${project.name} diagram`}
                      />
                    </div>
                  </div>
                )}

                {project.videoUrl && (
                  <div className="mt-6">
                    <p className="mb-3 text-xs font-medium text-foreground/90">
                      Demo
                    </p>
                    <div className="overflow-hidden border border-line">
                      <video
                        src={project.videoUrl}
                        controls
                        muted
                        playsInline
                        className="w-full"
                        title={`${project.name} demo`}
                      />
                    </div>
                  </div>
                )}

                {project.name === "AlphaSec Home Datacenter" && (
                  <div className="mt-6">
                    <button
                      onClick={() => setHtopOpen(!htopOpen)}
                      className="mb-3 flex items-center gap-2 text-xs font-medium text-foreground/90 transition-colors hover:text-accent"
                    >
                      Live services
                      {htopOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                    {htopOpen && <HomelabHtop />}
                  </div>
                )}

                <div className="mt-6 h-px bg-line" />
              </TerminalPanel>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
