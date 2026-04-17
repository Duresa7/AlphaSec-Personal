"use client";

import { workExamples } from "@/content/work-examples";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { VideoPlayer } from "@/components/ui/video-player";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

export default function WorkExamplesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-5xl px-6 lg:px-8 py-32">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} />
          cd ~
        </Link>

        {/* Header */}
        <div className="mt-12">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Work Examples
          </h1>
          <p className="mt-3 font-mono text-[11px] text-muted/50">
            {workExamples.length} projects // detailed breakdowns
          </p>
        </div>

        {/* Work examples */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-16 space-y-32"
        >
          {workExamples.map((example, index) => (
            <motion.article
              key={example.id}
              variants={fadeInUp}
              className="relative"
            >
              {/* Index number */}
              <span className="font-mono text-[11px] text-accent/40">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title row */}
              <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h2 className="font-heading text-3xl font-semibold tracking-tight">
                    {example.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-muted/60">
                    {example.subtitle}
                  </p>
                </div>
                {example.link && (
                  <MagneticButton
                    href={example.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 border border-accent/60 px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:border-accent hover:bg-accent/10"
                  >
                    View Project <ExternalLink size={14} />
                  </MagneticButton>
                )}
              </div>

              {/* Tech stack */}
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

              {/* Bold summary */}
              <p className="mt-6 max-w-prose text-base font-medium leading-relaxed text-foreground md:text-lg">
                {example.summary}
              </p>

              {/* Content with visual breaks */}
              <div className="mt-6 space-y-0">
                {example.description.map((paragraph, idx) => (
                  <div key={idx}>
                    {idx > 0 && (
                      <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-line/50" />
                        <span className="font-mono text-[10px] text-muted/30">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px flex-1 bg-line/50" />
                      </div>
                    )}

                    <p className="max-w-prose text-sm leading-[1.8] text-muted md:text-base">
                      {paragraph}
                    </p>

                    {/* Video after first paragraph for ValoBrain */}
                    {example.id === "valobrain" && idx === 0 && (
                      <VideoPlayer
                        src="/Valobrain-vid.mp4"
                        caption="valobrain demo // hackathon footage"
                        className="my-8"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom divider */}
              {index < workExamples.length - 1 && (
                <div className="mt-20 h-px bg-line" />
              )}
            </motion.article>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
