"use client";

import { SectionDivider } from "@/components/ui/section-divider";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";

const reviews = [
  {
    id: 1,
    name: 'Michael "Mas" Smith',
    affiliation: "Head Coach at FaZe Clan",
    quote:
      "Duresa consistently demonstrated an exceptional ability to deliver results regardless of the challenge in front of him. During his time as my assistant coach, he contributed meaningfully through strategic analysis, problem-solving, and a level of dedication that went well beyond his defined role. What stood out most was his remarkable capacity to absorb and apply new information quickly, adapting to whatever the situation demanded. He is exactly the kind of person you want in your corner.",
    imageSrc: "/mas.png",
    thumbnailSrc: "/mas.png",
  },
  {
    id: 2,
    name: "Katie Harry",
    affiliation: "Director at Converse University",
    quote: "Placeholder testimonial text.",
    imageSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Nomad",
    affiliation: "NBG President",
    quote: "Placeholder testimonial text.",
    imageSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Ahmed Haji",
    affiliation: "Waabee Self Help Founder",
    quote: "Placeholder testimonial text.",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=120&fit=crop&q=80",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <SectionDivider label="testimonials" />
        <TestimonialSlider reviews={reviews} className="mt-14" />
      </div>
    </section>
  );
}
