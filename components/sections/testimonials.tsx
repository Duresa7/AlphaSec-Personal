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
    quote:
      "In all my years leading this program, it is rare to come across someone with the level of maturity and intentionality that Duresa brought to his work. When he came on board, our teams were in a difficult place, and his presence was instrumental in turning things around. The athletes he coached looked up to him not because they were asked to, but because he earned it through his dedication and genuine ability to connect and inspire. His professionalism and character were a reflection of someone who truly understands what it means to be a leader, and he left a lasting impression on this program and everyone in it.",
    imageSrc: "/katie.jpg",
    thumbnailSrc: "/katie.jpg",
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
    quote:
      "Duresa was the backbone of our technology operations at Waabee Self-Help. As a nonprofit, we relied heavily on him to wear many hats, and he never once fell short. From managing our website and AV setup to establishing our entire business workspace including tools like Slack, he built the infrastructure that allowed our team to function and grow. What stood out most was that he did all of this on his own, with minimal direction and maximum initiative. He brought a level of professionalism and reliability to our organization that we genuinely could not have operated without. Any team would be lucky to have him.",
    imageSrc: "/ahmed.jpg",
    thumbnailSrc: "/ahmed.jpg",
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
