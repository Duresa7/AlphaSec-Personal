"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations";
import { Typewriter } from "@/components/ui/typewriter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SystemStatCard } from "@/components/ui/system-stat-card";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { primaryContactLinks } from "@/content/site";
import { education, certifications } from "@/content/education";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";

const commandSnapshots = [
  {
    command: "cat resume/experience.txt",
    output: experience.map((job) => job.company),
  },
  {
    command: "cat resume/education.txt",
    output: education.map((entry) => entry.degree),
  },
  {
    command: "cat resume/certifications.txt",
    output: certifications.slice(0, 3),
  },
  {
    command: "cat resume/projects.txt",
    output: projects.slice(0, 2).map((project) => project.name),
  },
];

export function Hero() {
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [activeCommand, setActiveCommand] = useState(0);
  const githubLink = primaryContactLinks.find((link) => link.key === "github");
  const emailLink = primaryContactLinks.find((link) => link.key === "email");
  const mostRecentDegree =
    education.find((entry) => entry.school === "Montgomery College") ??
    education[0];

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

          <motion.p variants={fadeInUp} className="ui-mono-label mt-3 text-muted">
            resume-backed portfolio
          </motion.p>

          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  href={githubLink?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <Github size={15} />
                  GitHub
                </MagneticButton>
                <MagneticButton
                  href={emailLink?.href}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <Mail size={15} />
                  Email
                </MagneticButton>
              </div>

              <motion.div
                variants={fadeIn}
                className="grid gap-4 md:grid-cols-2"
              >
                <SystemStatCard
                  label="certifications"
                  value={certifications[0]}
                  meta={certifications[1]}
                  status="verified"
                />
                <SystemStatCard
                  label="education"
                  value={mostRecentDegree.degree}
                  meta={`${mostRecentDegree.school}, ${mostRecentDegree.location}`}
                  status={mostRecentDegree.expected}
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="lg:-mt-[7.5rem] lg:justify-self-end"
            >
              <TerminalPanel
                title="command feed"
                subtitle="rotating context"
                status="live"
              >
                <div className="space-y-3 p-5">
                  <p className="text-xs font-medium text-muted">
                    Active snapshot
                  </p>
                  <div className="rounded-lg border border-line bg-background/70 p-4">
                    <p className="font-mono text-sm text-foreground">
                      <span className="text-muted">$ </span>
                      {commandSnapshots[activeCommand].command}
                    </p>
                    <div className="mt-3 space-y-1.5">
                      {commandSnapshots[activeCommand].output.map((line) => (
                        <div key={line} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TerminalPanel>
            </motion.div>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
