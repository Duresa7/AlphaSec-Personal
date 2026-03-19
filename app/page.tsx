import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { WorkExamplesPreview } from "@/components/sections/work-examples-preview";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <WorkExamplesPreview />
      <TestimonialsSection />
      <Contact />
    </>
  );
}
