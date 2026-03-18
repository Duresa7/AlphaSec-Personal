"use client";

import { skills } from "@/content/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

export function Skills() {
  return (
    <section id="skills" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading>Skills</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-10 md:grid-cols-2"
        >
          {skills.map((category) => (
            <motion.div key={category.label} variants={fadeInUp}>
              <p className="text-xs uppercase tracking-widest text-accent">
                {category.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-foreground"
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
