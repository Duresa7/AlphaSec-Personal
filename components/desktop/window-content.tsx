"use client";

import dynamic from "next/dynamic";
import type { WindowId } from "@/content/desktop";
import { DesktopTerminal } from "./desktop-terminal";
import { FileManager } from "./file-manager";

// Lazy-load section components to keep initial bundle small
const Hero = dynamic(
  () => import("@/components/sections/hero").then((m) => ({ default: m.Hero })),
  { loading: () => <WindowSkeleton /> }
);
const About = dynamic(
  () =>
    import("@/components/sections/about").then((m) => ({ default: m.About })),
  { loading: () => <WindowSkeleton /> }
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/testimonials").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <WindowSkeleton /> }
);
const Experience = dynamic(
  () =>
    import("@/components/sections/experience").then((m) => ({
      default: m.Experience,
    })),
  { loading: () => <WindowSkeleton /> }
);
const Education = dynamic(
  () =>
    import("@/components/sections/education").then((m) => ({
      default: m.Education,
    })),
  { loading: () => <WindowSkeleton /> }
);
const Skills = dynamic(
  () =>
    import("@/components/sections/skills").then((m) => ({
      default: m.Skills,
    })),
  { loading: () => <WindowSkeleton /> }
);
const Projects = dynamic(
  () =>
    import("@/components/sections/projects").then((m) => ({
      default: m.Projects,
    })),
  { loading: () => <WindowSkeleton /> }
);
const WorkExamplesContent = dynamic(
  () =>
    import("./work-examples-window").then((m) => ({
      default: m.WorkExamplesWindow,
    })),
  { loading: () => <WindowSkeleton /> }
);
const Contact = dynamic(
  () =>
    import("@/components/sections/contact").then((m) => ({
      default: m.Contact,
    })),
  { loading: () => <WindowSkeleton /> }
);

function WindowSkeleton() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-[blink_1s_step-end_infinite] bg-accent" />
        <span className="ui-mono-label text-muted/60">loading...</span>
      </div>
    </div>
  );
}

const windowContentMap: Record<WindowId, React.ComponentType> = {
  dossier: () => (
    <div className="window-content-wrapper">
      <Hero />
      <About />
    </div>
  ),
  comms: () => (
    <div className="window-content-wrapper">
      <TestimonialsSection />
    </div>
  ),
  "ops-log": () => (
    <div className="window-content-wrapper">
      <Experience />
    </div>
  ),
  certs: () => (
    <div className="window-content-wrapper">
      <Education />
    </div>
  ),
  modules: () => (
    <div className="window-content-wrapper">
      <Skills />
    </div>
  ),
  builds: () => (
    <div className="window-content-wrapper">
      <Projects />
    </div>
  ),
  "case-files": () => (
    <div className="window-content-wrapper">
      <WorkExamplesContent />
    </div>
  ),
  "secure-ch": () => (
    <div className="window-content-wrapper">
      <Contact />
    </div>
  ),
  terminal: DesktopTerminal,
  "file-manager": FileManager,
};

interface WindowContentProps {
  windowId: WindowId;
}

export function WindowContent({ windowId }: WindowContentProps) {
  const Content = windowContentMap[windowId];
  return <Content />;
}
