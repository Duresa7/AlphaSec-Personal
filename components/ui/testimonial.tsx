"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Michael "Mas" Smith',
    role: "Head Coach at FaZe Clan",
    quote: "Placeholder testimonial text.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    name: "Katie Harry",
    role: "Director at Converse University",
    quote: "Placeholder testimonial text.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    name: "Nomad",
    role: "NBG President",
    quote: "Placeholder testimonial text.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    name: "Ahmed Haji",
    role: "Waabee Self Help Founder",
    quote: "Placeholder testimonial text.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop",
  },
];

export function Testimonials() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {testimonials.map((t) => (
        <motion.div
          key={t.name}
          variants={fadeInUp}
          className="group border border-line bg-surface transition-all hover:border-accent/30"
        >
          <div className="relative overflow-hidden">
            <img
              src={t.image}
              alt={t.name}
              className="h-[220px] w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
          </div>
          <div className="px-4 pb-4">
            <p className="text-sm leading-relaxed text-muted border-b border-line pb-4">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="mt-3 font-mono text-xs text-foreground">
              {t.name}
            </p>
            <p className="font-mono text-[11px] text-accent">
              {t.role}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
