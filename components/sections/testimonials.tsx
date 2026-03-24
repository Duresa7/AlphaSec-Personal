"use client";

import { SectionDivider } from "@/components/ui/section-divider";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { testimonials } from "@/content/site";

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionDivider
          label="operator feedback"
          step="02"
          status="trusted channel"
        />
        <TestimonialSlider reviews={testimonials} className="mt-14" />
      </div>
    </section>
  );
}
