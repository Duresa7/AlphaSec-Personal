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
                    <h3 className="font-heading text-lg font-semibold">
                      {project.name}
                    </h3>
                    <p className="ui-mono-label mt-1 text-muted/60">
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
                    <StatusPill key={tech}>{tech}</StatusPill>
                  ))}
                </div>

                <ul className="mt-5 max-w-2xl space-y-3">
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

                {project.diagramUrl && (
                  <div className="mt-6">
                    <p className="ui-mono-label mb-3 text-muted/50">
                      {"// network diagram"}
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
                    <p className="ui-mono-label mb-3 text-muted/50">
                      {"// demo"}
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

                {/* htop panel for Homelab */}
                {project.name === "Homelab" && (
                  <div className="mt-6">
                    <button
                      onClick={() => setHtopOpen(!htopOpen)}
                      className="ui-mono-label mb-3 flex items-center gap-2 text-muted/50 transition-colors hover:text-accent"
                    >
                      {"// live services"}
                      {htopOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                    {htopOpen && <HomelabHtop />}
                  </div>
                )}

                <div className="mt-6 route-track h-4" />
              </TerminalPanel>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
