"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations";
import { Typewriter } from "@/components/ui/typewriter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SystemStatCard } from "@/components/ui/system-stat-card";
import { TerminalPanel } from "@/components/ui/terminal-panel";

const commandSnapshots = [
  {
    command: "whoami",
    output: [
      "duresa",
      "role=it-ops",
      "focus=network-defense+cloud",
    ],
  },
  {
    command: "ip addr show homelab0",
    output: [
      "mgmt: 10.10.10.0/24",
      "servers: 10.10.20.0/24",
      "dmz: segmented + monitored",
    ],
  },
  {
    command: "ss -tulpn",
    output: [
      "wireguard: established",
      "wazuh: listening",
      "exposure: zero open wan ports",
    ],
  },
  {
    command: "nmap --top-ports 20 perimeter",
    output: [
      "cloudflare-tunnel: proxied",
      "suricata: alerting",
      "response: automated-enrichment",
    ],
  },
];

export function Hero() {
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [activeCommand, setActiveCommand] = useState(0);

  useEffect(() => {
    if (!typewriterDone) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveCommand((current) => (current + 1) % commandSnapshots.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [typewriterDone]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[70vh] items-end overflow-hidden pb-12 pt-24 md:items-center md:pb-0"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="font-mono text-sm text-accent">
          <span className="text-muted">&gt; </span>
          <Typewriter
            text="duresa@kadi:~$ whoami"
            speed={35}
            delay={400}
            onComplete={() => setTypewriterDone(true)}
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={typewriterDone ? "visible" : "hidden"}
        >
          <motion.h1
            variants={fadeInUp}
            className="mt-5 font-heading text-5xl font-bold leading-[1.0] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            DURESA
            <br />
            KADI
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            IT &amp; security professional
          </motion.p>

          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <motion.div variants={fadeInUp}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  href="https://github.com/Duresa7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Github size={14} />
                  GitHub
                </MagneticButton>
                <MagneticButton
                  href="mailto:duresakadi@gmail.com"
                  className="inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Mail size={14} />
                  Email
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TerminalPanel
                title="command feed"
                subtitle="rotating operator context"
                status="live"
              >
                <div className="space-y-4 p-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    <span className="text-accent">~</span> active snapshot
                  </div>
                  <div className="border border-line/70 bg-background/60 p-4 font-mono text-sm">
                    <div className="text-accent">
                      <span className="text-muted">&gt; </span>
                      {commandSnapshots[activeCommand].command}
                    </div>
                    <div className="mt-4 space-y-2 text-[12px] text-muted">
                      {commandSnapshots[activeCommand].output.map((line) => (
                        <div key={line} className="flex gap-3">
                          <span className="text-accent/60">|</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TerminalPanel>
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <SystemStatCard
              label="certifications"
              value="Security+ / AWS CCP"
              meta="Security operations and foundational cloud coverage."
              status="verified"
            />
            <SystemStatCard
              label="education"
              value="A.A.S. Cybersecurity"
              meta="Montgomery College - 3.4 GPA, 3x Dean's List."
            />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
