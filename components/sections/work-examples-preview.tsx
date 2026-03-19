"use client";

import { workExamples } from "@/content/work-examples";
import { SectionDivider } from "@/components/ui/section-divider";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export function WorkExamplesPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionDivider label="work examples" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 space-y-6"
        >
          {workExamples.map((example, index) => (
            <motion.div
              key={example.id}
              variants={fadeInUp}
              className="group border border-line p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_20px_var(--accent-dim)] md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-accent/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">
                      {example.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] text-muted/60">
                      {example.subtitle}
                    </p>
                  </div>
                </div>
                {example.link && (
                  <a
                    href={example.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-muted transition-colors hover:text-accent"
                    aria-label={`View ${example.title}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
                {example.summary}
              </p>

              {example.tech && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {example.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-accent/20 px-2 py-0.5 font-mono text-[11px] text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <MagneticButton
            href="/work"
            className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
          >
            View detailed breakdowns <ArrowRight size={14} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
