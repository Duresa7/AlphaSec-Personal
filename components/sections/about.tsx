"use client";

import { useState } from "react";
import { SectionDivider } from "@/components/ui/section-divider";
import { StatusPill } from "@/components/ui/status-pill";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { IptablesRuleset } from "@/components/ui/iptables-ruleset";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const paragraphs = [
  "I'm Duresa. I grew up taking things apart to understand how they work, and that instinct never left. Whether it's a network, a codebase, or an engine, I want to know what's actually happening under the hood. I'm also a huge Ford Mustang fan, have strong opinions about office chairs, and I believe a bad chair is a genuine productivity hazard.",
  "I spent four years in competitive esports as both a player and a coach. The discipline, pattern recognition, and ability to stay sharp under pressure all followed me into IT and honestly made me better at it. I've been doing IT work through my own business and through roles where I was the only technical person in the room. That taught me how to figure things out fast and own problems end to end.",
  "My homelab is probably the best reflection of who I am. I run Proxmox VE with a segmented network, Wazuh SIEM, Suricata IDS, WireGuard, and automated threat response pipelines. It started as a learning environment and became something I genuinely rely on. Right now I'm building AlphaSec and always looking for the next thing to build or break.",
];

const paragraphLabels = [
  "profile",
  "background",
  "homelab + current",
];

export function About() {
  const [showIptables, setShowIptables] = useState(false);

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionDivider label="about me" step="01" status="dossier online" />

        <TerminalPanel
          title="operator dossier"
          subtitle="profile / experience / build philosophy"
          status="indexed"
          className="mt-14"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-5 p-6 md:p-8"
          >
            {paragraphs.map((text, i) => (
              <motion.div
                key={paragraphLabels[i]}
                variants={fadeInUp}
                className="border border-line/70 bg-background/40 p-4 md:p-5"
              >
                <StatusPill className="mb-4">{paragraphLabels[i]}</StatusPill>
                <p className="max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </TerminalPanel>

        {/* Iptables Ruleset - collapsed by default */}
        <div className="mt-6">
          <button
            onClick={() => setShowIptables(!showIptables)}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted/50 transition-colors hover:text-accent"
          >
            {"// operator policy"}
            {showIptables ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          {showIptables && (
            <div className="mt-4">
              <IptablesRuleset />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
