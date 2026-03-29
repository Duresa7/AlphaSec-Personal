"use client";

import { workExamples } from "@/content/work-examples";
import { ExternalLink } from "lucide-react";
import { VideoPlayer } from "@/components/ui/video-player";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

export function WorkExamplesWindow() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Case Files
          </h1>
          <p className="mt-2 font-mono text-[11px] text-foreground/90">
            {workExamples.length} projects // detailed breakdowns
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 space-y-20"
        >
          {workExamples.map((example, index) => (
            <motion.article
              key={example.id}
              variants={fadeInUp}
              className="relative"
            >
              <span className="font-mono text-[11px] text-accent/40">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-semibold tracking-tight">
                    {example.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-foreground/90">
                    {example.subtitle}
                  </p>
                </div>
                {example.link && (
                  <MagneticButton
                    href={example.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/90 transition-colors hover:border-accent hover:text-accent"
                  >
                    View <ExternalLink size={12} />
                  </MagneticButton>
                )}
              </div>

              {example.tech && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {example.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-accent/20 px-1.5 py-0.5 font-mono text-[10px] text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-5 max-w-prose text-sm font-medium leading-relaxed text-foreground">
                {example.summary}
              </p>

              <div className="mt-4 space-y-0">
                {example.description.map((paragraph, idx) => (
                  <div key={idx}>
                    {idx > 0 && (
                      <div className="my-4 flex items-center gap-3">
                        <div className="h-px flex-1 bg-line/50" />
                        <span className="font-mono text-[10px] text-foreground/70">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px flex-1 bg-line/50" />
                      </div>
                    )}
                    <p className="max-w-prose text-sm leading-[1.8] text-foreground">
                      {paragraph}
                    </p>
                    {example.id === "valobrain" && idx === 0 && (
                      <VideoPlayer
                        src="/Valobrain-vid.mp4"
                        caption="valobrain demo // hackathon footage"
                        className="my-6"
                      />
                    )}
                  </div>
                ))}
              </div>

              {index < workExamples.length - 1 && (
                <div className="mt-12 h-px bg-line" />
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
