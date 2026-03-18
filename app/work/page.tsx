"use client";

import { workExamples } from "@/content/work-examples";
import { AnimateIn } from "@/components/motion/animate-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

export default function WorkExamplesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-6 py-32">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 mb-16 text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
        
        <SectionHeading>Work Examples</SectionHeading>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-16 space-y-24"
        >
          {workExamples.map((example) => (
            <motion.div key={example.id} variants={fadeInUp} className="relative">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-8">
                <h2 className="font-heading text-3xl font-semibold tracking-tight">
                  {example.title}
                </h2>
                {example.link && (
                  <a
                    href={example.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-line px-5 py-2 text-xs uppercase tracking-widest text-muted transition-colors hover:border-foreground hover:text-foreground shrink-0"
                  >
                    View Project <ExternalLink size={14} />
                  </a>
                )}
              </div>
              
              <div className="space-y-6">
                {example.description.map((paragraph, idx) => (
                  <p key={idx} className="text-sm md:text-base leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="absolute -left-6 top-2 bottom-0 w-px bg-line/50 hidden md:block" />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
