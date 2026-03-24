"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/motion/animate-in";
import { Mail, Github, Linkedin, ChevronDown, ChevronUp } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionDivider } from "@/components/ui/section-divider";
import { StatusPill } from "@/components/ui/status-pill";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { DnsLookupCard } from "@/components/ui/dns-lookup-card";
import { CrontabSchedule } from "@/components/ui/crontab-schedule";

export function Contact() {
  const [showExtras, setShowExtras] = useState(false);

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionDivider label="contact" step="08" status="secure channels" />

        <AnimateIn>
          <TerminalPanel
            title="secure channel"
            subtitle="outbound contact endpoints"
            status="reachable"
            className="mt-14"
          >
            <div className="px-6 py-8 text-center md:px-10">
              <p className="font-mono text-sm text-accent">
                <span className="text-muted">&gt; </span>
                echo &quot;let&apos;s connect&quot;
              </p>

              <h2 className="mt-6 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                Let&apos;s connect
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
                Currently seeking any IT opportunities. Feel free to reach out.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <StatusPill status="active">email</StatusPill>
                <StatusPill>github</StatusPill>
                <StatusPill>linkedin</StatusPill>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  href="mailto:duresakadi@gmail.com"
                  className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Mail size={14} />
                  endpoint://email
                </MagneticButton>
                <MagneticButton
                  href="https://github.com/Duresa7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Github size={14} />
                  endpoint://github
                </MagneticButton>
                <MagneticButton
                  href="https://www.linkedin.com/in/duresa-k-630039329/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Linkedin size={14} />
                  endpoint://linkedin
                </MagneticButton>
              </div>
            </div>
          </TerminalPanel>
        </AnimateIn>

        {/* DNS + Crontab - collapsed by default */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowExtras(!showExtras)}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted/50 transition-colors hover:text-accent"
          >
            {"// dns records & schedule"}
            {showExtras ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
        {showExtras && (
          <div className="mt-4 space-y-6">
            <DnsLookupCard />
            <CrontabSchedule />
          </div>
        )}
      </div>
    </section>
  );
}
