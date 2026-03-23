"use client";

import { AnimateIn } from "@/components/motion/animate-in";
import { Mail, Github, Linkedin } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Contact() {
  return (
    <section id="contact" className="py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <AnimateIn>
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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href="mailto:duresakadi@gmail.com"
              className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={14} />
              duresakadi@gmail.com
            </MagneticButton>
            <MagneticButton
              href="https://github.com/Duresa7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={14} />
              GitHub
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/duresa-k-630039329/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin size={14} />
              LinkedIn
            </MagneticButton>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
