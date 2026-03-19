"use client";

import { SectionDivider } from "@/components/ui/section-divider";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

const paragraphs = [
  "I'm Duresa. I'm a tech enthusiast first, a cybersecurity professional second, and someone who will never stop tinkering. I grew up taking things apart to understand how they work, and that instinct never left. Whether it's a network, a codebase, or an engine, I want to know what's actually happening under the hood. I'm also a huge Ford Mustang fan, have strong opinions about office chairs, and I believe a bad chair is a genuine productivity hazard.",

  "I spent four years in competitive esports, both as a player and a coach. That world taught me more than I expected. The discipline, the pattern recognition, the ability to stay sharp under pressure and build strategy from raw data. Those skills followed me into cybersecurity and honestly made me better at it.",

  "I finished my AAS in Cybersecurity at Montgomery College and I'm now pursuing a B.S. in Cyber Operations at UMGC. I have my Security+ and AWS Cloud Practitioner certs, but more than the credentials, I care about actually understanding how things work at a low level and being able to build around that understanding.",

  "My homelab is probably the best reflection of who I am. I run Proxmox VE with a fully segmented network, Wazuh SIEM, Suricata IDS, WireGuard, and a Cloudflare Tunnel setup. I've built automation pipelines that pull in security alerts, enrich them with threat intel, run them through the Claude API, and respond to threats without me having to touch anything. It started as a learning environment and turned into something I genuinely rely on.",

  "I've been doing IT work for a while now, through my own business and through roles where I was the only technical person in the room. That experience taught me how to figure things out quickly, communicate clearly with non-technical people, and take ownership of problems end to end.",

  "Right now I'm deep in a few projects, AlphaSec being the main one, and I'm always looking for the next thing to build or break.",
];

export function About() {
  return (
    <section id="about" className="py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-6">
        <SectionDivider label="about me" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 space-y-6"
        >
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              variants={fadeInUp}
              className="text-sm leading-relaxed text-muted md:text-base"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
