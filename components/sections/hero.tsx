"use client";

import { motion } from "framer-motion";
import { Github, Mail, FileDown } from "lucide-react";
import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-end pb-24 pt-32 md:items-center md:pb-0">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-5xl px-6"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs uppercase tracking-[0.25em] text-accent"
        >
          Cybersecurity &amp; IT Professional
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="mt-6 font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Duresa
          <br />
          Kadi
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg"
        >
          Entry-level cybersecurity and IT professional with hands-on experience
          in SIEM deployment, network security, cloud infrastructure, and
          incident response.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="https://github.com/Duresa7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-line px-5 py-2.5 text-xs uppercase tracking-widest text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="mailto:duresakadi@gmail.com"
            className="inline-flex items-center gap-2 border border-line px-5 py-2.5 text-xs uppercase tracking-widest text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            <Mail size={14} />
            Email
          </a>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="mt-16 flex items-center gap-6 text-xs text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            CompTIA Security+
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            AWS Cloud Practitioner
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
