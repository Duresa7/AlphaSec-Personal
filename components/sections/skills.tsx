"use client";

import { skills } from "@/content/skills";
import { SectionDivider } from "@/components/ui/section-divider";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function Skills() {
  return (
    <section id="skills" className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionDivider label="skills" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 space-y-10"
        >
          {skills.map((category) => (
            <motion.div key={category.label} variants={fadeInUp}>
              {/* Terminal-style category header */}
              <p className="font-mono text-[11px] text-muted">
                <span className="text-accent">~/{slugify(category.label)}</span>
                <span className="text-muted/40"> $ </span>
                <span className="text-muted/60">ls</span>
              </p>

              {/* Skill items */}
              <div className="mt-3 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="border border-line px-3 py-1.5 font-mono text-xs text-muted transition-all hover:border-accent/50 hover:text-foreground hover:shadow-[0_0_12px_var(--accent-dim)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
