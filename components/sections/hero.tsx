"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, FileDown } from "lucide-react";
import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations";
import { Typewriter } from "@/components/ui/typewriter";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Hero() {
  const [typewriterDone, setTypewriterDone] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-end pb-24 pt-32 md:items-center md:pb-0"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        {/* Terminal prompt */}
        <div className="font-mono text-sm text-accent">
          <span className="text-muted">&gt; </span>
          <Typewriter
            text="duresa@kadi:~$ whoami"
            speed={35}
            delay={400}
            onComplete={() => setTypewriterDone(true)}
          />
        </div>

        {/* Name and content - stagger in after typewriter */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={typewriterDone ? "visible" : "hidden"}
        >
          <motion.h1
            variants={fadeInUp}
            className="mt-8 font-heading text-5xl font-bold leading-[1.0] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            DURESA
            <br />
            KADI
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            cybersecurity &amp; IT professional
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg"
          >
            Entry-level cybersecurity and IT professional with hands-on
            experience in SIEM deployment, network security, cloud
            infrastructure, and incident response.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
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
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-16 flex items-center gap-6 font-mono text-xs text-muted"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              CompTIA Security+
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              AWS Cloud Practitioner
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
