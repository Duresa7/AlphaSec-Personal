"use client";

import { SectionDivider } from "@/components/ui/section-divider";
import { Testimonials } from "@/components/ui/testimonial";

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionDivider label="testimonials" />
        <Testimonials />
      </div>
    </section>
  );
}
