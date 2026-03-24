"use client";

import { useState } from "react";
import { experience } from "@/content/experience";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { StatusPill } from "@/components/ui/status-pill";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ServiceCard({
  job,
  index,
}: {
  job: (typeof experience)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const serviceName = `${slugify(job.company)}.service`;
  const isActive = index === 0;

  return (
    <motion.div variants={fadeInUp}>
      {/* Collapsed: systemctl status one-liner */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "ui-mono-body w-full text-left transition-colors",
          "border border-line/70 bg-background/40 p-4 hover:border-accent/30",
          expanded && "border-b-0"
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-block h-2 w-2",
              isActive ? "bg-accent" : "bg-muted/40"
            )}
          />
          <span className="text-accent">{serviceName}</span>
          <span className="text-muted/50">-</span>
          <span className="text-foreground/80">{job.role}</span>
          <StatusPill status={isActive ? "active" : "default"}>
            {isActive ? "active (running)" : "inactive (exited)"}
          </StatusPill>
        </div>
      </button>

      {/* Expanded: unit file + journal */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border border-t-0 border-line/70 bg-background/30 p-4 md:p-5">
          {/* Unit file */}
          <div className="ui-mono-meta space-y-0.5">
            <p className="text-accent font-medium">[Unit]</p>
            <p>
              <span className="text-muted/50">Description=</span>
              <span className="text-foreground/80">{job.role} @ {job.company}</span>
            </p>
            <p>
              <span className="text-muted/50">Documentation=</span>
              <span className="text-foreground/60">man:{slugify(job.company)}</span>
            </p>
            <p>
              <span className="text-muted/50">After=</span>
              <span className="text-foreground/60">
                {index < experience.length - 1
                  ? `${slugify(experience[index + 1].company)}.service`
                  : "network.target"}
              </span>
            </p>

            <p className="mt-3 text-accent font-medium">[Service]</p>
            <p>
              <span className="text-muted/50">Type=</span>
              <span className="text-foreground/60">{isActive ? "simple" : "oneshot"}</span>
            </p>
            <p>
              <span className="text-muted/50">User=</span>
              <span className="text-foreground/60">duresa</span>
            </p>
            <p>
              <span className="text-muted/50">WorkingDirectory=</span>
              <span className="text-foreground/60">/opt/{slugify(job.company)}</span>
            </p>
            <p>
              <span className="text-muted/50">ExecStart=</span>
              <span className="text-foreground/80">/usr/local/bin/{slugify(job.role)}</span>
            </p>
            <p>
              <span className="text-muted/50">Environment=</span>
              <span className="text-foreground/60">LOCATION={job.location}</span>
            </p>

            <p className="mt-3 text-accent font-medium">[Install]</p>
            <p>
              <span className="text-muted/50">WantedBy=</span>
              <span className="text-foreground/60">career.target</span>
            </p>
          </div>

          {/* Journal entries */}
          <div className="mt-5 border-t border-line/50 pt-4">
            <p className="ui-mono-label mb-2 text-muted/40">
              journalctl -u {serviceName} --no-pager -n {job.bullets.length}
            </p>

            <div className="space-y-1.5">
              {job.bullets.map((bullet, i) => (
                <div key={i} className="ui-mono-meta">
                  <span className="text-muted/40">{job.period.split("-")[0].trim()} </span>
                  <span className="text-accent/60">{slugify(job.company)}[{3000 + index * 100 + i}]: </span>
                  <span className="text-muted/80">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SystemctlTimeline() {
  return (
    <TerminalPanel
      title="systemctl list-units --type=service --state=active,inactive"
      subtitle="career service manager"
      status="loaded"
      bodyClassName="p-5 md:p-6"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-3"
      >
        {experience.map((job, index) => (
          <ServiceCard key={job.company} job={job} index={index} />
        ))}
      </motion.div>

      <div className="mt-4 border-t border-line/50 pt-3">
        <p className="ui-mono-meta text-muted/40">
          {experience.length} units listed. {experience.filter((_, i) => i === 0).length} active.
        </p>
      </div>
    </TerminalPanel>
  );
}
