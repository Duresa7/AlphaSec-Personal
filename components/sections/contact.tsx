"use client";

import { AnimateIn } from "@/components/motion/animate-in";
import { Mail, Github } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-line py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <AnimateIn>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Get in Touch
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Let&apos;s connect
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            I&apos;m currently looking for SOC Analyst, IT Support, or Security
            Engineer opportunities. Feel free to reach out.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:duresakadi@gmail.com"
              className="inline-flex items-center gap-2 border border-line px-6 py-3 text-xs uppercase tracking-widest text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              <Mail size={14} />
              duresakadi@gmail.com
            </a>
            <a
              href="https://github.com/Duresa7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line px-6 py-3 text-xs uppercase tracking-widest text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
