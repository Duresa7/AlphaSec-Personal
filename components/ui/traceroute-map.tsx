"use client";

import { useState } from "react";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

interface Hop {
  number: number;
  hostname: string;
  ip: string;
  latencyMs: number;
  label: string;
  detail: string;
  inProgress?: boolean;
}

const hops: Hop[] = [
  {
    number: 1,
    hostname: "montgomery-college.edu",
    ip: "10.0.1.1",
    latencyMs: 24,
    label: "A.A.S. Cybersecurity",
    detail: "Montgomery College - 3.4 GPA, 3x Dean's List",
  },
  {
    number: 2,
    hostname: "comptia.org",
    ip: "10.0.2.1",
    latencyMs: 6,
    label: "CompTIA Security+",
    detail: "Industry certification - security fundamentals",
  },
  {
    number: 3,
    hostname: "aws.amazon.com",
    ip: "10.0.2.2",
    latencyMs: 4,
    label: "AWS Cloud Practitioner",
    detail: "Cloud certification - foundational AWS",
  },
  {
    number: 4,
    hostname: "alphabiz.local",
    ip: "10.0.3.1",
    latencyMs: 42,
    label: "AlphaBiz - IT Owner",
    detail: "Feb 2022 - Jun 2025 · 148+ clients, $4K+ revenue",
  },
  {
    number: 5,
    hostname: "converse.edu",
    ip: "10.0.4.1",
    latencyMs: 24,
    label: "Converse - Head Coach",
    detail: "Jul 2023 - Jun 2025 · Esports strategy & analytics",
  },
  {
    number: 6,
    hostname: "waabee-selfhelp.org",
    ip: "10.0.5.1",
    latencyMs: 23,
    label: "Waabee - IT Technician",
    detail: "Jan 2024 - Dec 2025 · Sole IT specialist, serverless AWS",
  },
  {
    number: 7,
    hostname: "proxmox.homelab.local",
    ip: "10.10.0.1",
    latencyMs: 1,
    label: "Homelab Deployed",
    detail: "Proxmox, Wazuh SIEM, Suricata IDS, WireGuard, n8n + Claude API",
  },
  {
    number: 8,
    hostname: "umgc.edu",
    ip: "10.0.6.1",
    latencyMs: -1,
    label: "B.S. Cyber Operations",
    detail: "UMGC - Expected Nov 2027",
    inProgress: true,
  },
];

const hopVariant = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function TracerouteMap() {
  const [hoveredHop, setHoveredHop] = useState<number | null>(null);

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <TerminalPanel
          title="traceroute career.duresa.local"
          subtitle="30 hops max, 60 byte packets"
          status="complete"
          bodyClassName="p-5 md:p-6"
        >
          {/* Traceroute header */}
          <p className="mb-4 font-mono text-[11px] text-muted/50">
            traceroute to career.duresa.local (10.0.0.1), 30 hops max, 60 byte packets
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative"
          >
            {/* Vertical connector line */}
            <div className="absolute bottom-2 left-[18px] top-2 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" />

            {hops.map((hop, i) => (
              <motion.div
                key={hop.number}
                custom={i}
                variants={hopVariant}
                className={cn(
                  "group relative flex items-start gap-4 py-2.5 pl-10 pr-3 transition-colors",
                  "hover:bg-accent-dim/10",
                  hoveredHop === hop.number && "bg-accent-dim/10"
                )}
                onMouseEnter={() => setHoveredHop(hop.number)}
                onMouseLeave={() => setHoveredHop(null)}
              >
                {/* Node dot */}
                <div
                  className={cn(
                    "absolute left-[13px] top-[18px] h-[12px] w-[12px] border transition-colors",
                    hop.inProgress
                      ? "animate-pulse border-warning bg-warning/20"
                      : "border-accent bg-accent/20",
                    hoveredHop === hop.number && !hop.inProgress && "bg-accent/40"
                  )}
                />

                {/* Hop number */}
                <span className="w-5 flex-shrink-0 text-right font-mono text-xs text-muted/40 tabular-nums">
                  {hop.number}
                </span>

                {/* Hop content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs">
                    <span className="text-foreground/85">{hop.hostname}</span>
                    <span className="text-muted/40">({hop.ip})</span>
                    {hop.inProgress ? (
                      <span className="animate-pulse text-warning">* * *</span>
                    ) : (
                      <span className="text-muted/50 tabular-nums">
                        {hop.latencyMs}ms{"  "}{hop.latencyMs + 1}ms{"  "}{hop.latencyMs + 2}ms
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <p className="mt-1 text-sm text-foreground/70 group-hover:text-foreground/90">
                    {hop.label}
                  </p>

                  {/* Expanded detail on hover */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      hoveredHop === hop.number ? "mt-1 max-h-20 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="font-mono text-[11px] text-muted/60">{hop.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <div className="mt-4 border-t border-line/50 pt-3">
            <p className="font-mono text-[11px] text-accent/60">
              traceroute complete - {hops.length} hops traversed
            </p>
          </div>
        </TerminalPanel>
      </div>
    </section>
  );
}
