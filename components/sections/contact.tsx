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
import { primaryContactLinks } from "@/content/site";

const iconMap = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
} as const;

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
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Let&apos;s connect
              </h2>

              <p className="mx-auto mt-4 max-w-md text-base text-foreground/60 leading-relaxed">
                Currently seeking any IT opportunities. Feel free to reach out.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                {primaryContactLinks.map((link) => {
                  const Icon = iconMap[link.key];
                  const isExternal = link.href.startsWith("http");

                  return (
                    <MagneticButton
                      key={link.key}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-sm font-medium text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon size={15} />
                      {link.key}
                    </MagneticButton>
                  );
                })}
              </div>
            </div>
          </TerminalPanel>
        </AnimateIn>

        {/* DNS + Crontab - collapsed by default */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowExtras(!showExtras)}
            className="flex items-center gap-2 text-xs font-medium text-muted/60 transition-colors hover:text-accent"
          >
            DNS records &amp; schedule
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
