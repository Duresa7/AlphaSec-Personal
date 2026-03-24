import { projectLinks } from "@/content/site";

export interface WorkExample {
  id: string;
  title: string;
  subtitle: string;
  link?: string;
  summary: string;
  description: string[];
  tech?: string[];
}

export const workExamples: WorkExample[] = [
  {
    id: "alphasecunited",
    title: "AlphaSecUnited",
    subtitle: "Full-Stack Community Platform",
    link: projectLinks.alphaSecUnited,
    summary: "A full-stack web platform supporting live operations for a 200+ member gaming community, featuring an interactive 3D galaxy map and real-time coordination tools.",
    tech: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Three.js"],
    description: [
      "AlphaSecUnited is a full-stack web platform built and deployed to support live operations for The New Imperial Order, a video game community with 200+ active members. The core experience is an interactive 3D galaxy map that gives members a shared, real-time view of territories, fleets, and strategic movement, while centralizing communication through integrated news, updates, and feedback workflows. The platform functions as both a community-facing product and an operations tool, balancing immersive UX with practical coordination features, administrative control, and security-first design.",
      "The project uses a modern React + TypeScript + Vite architecture with production deployment workflows, including optimized code-splitting for 3D rendering and backend client modules to improve performance and responsiveness. Secure authentication and authorization are implemented through Supabase, including OAuth/PKCE flows, with role-based access controls for protected user routes and elevated admin functions. Audit-oriented administration pathways support activity monitoring, operational oversight, and accountability in a live environment.",
      "The data layer is built on Supabase/PostgreSQL for map entities, faction data, settings, profiles, and logs, with typed serialization between frontend models and database schema to improve consistency and reduce integration risk. Real-time synchronization propagates map and faction updates across sessions, supporting data integrity and coordinated decision-making for concurrent users. End to end, the project demonstrates ownership across product delivery, frontend engineering, secure access architecture, operational governance, data modeling, and production deployment in a multi-user system."
    ]
  },
  {
    id: "valobrain",
    title: "ValoBrain",
    subtitle: "AI-Powered Esports Analytics",
    link: projectLinks.valoBrain,
    summary: "An open-source AI analytics platform for competitive Valorant, used by 10+ semi-professional and professional teams for scouting and coaching intelligence.",
    tech: ["React", "TypeScript", "Node.js", "Express", "Gemini", "OpenAI", "Claude"],
    description: [
      "I co-founded and built Valobrain, an open-source AI-powered analytics platform for competitive Valorant, alongside two partners. I led major parts of the product architecture and implementation, focusing on turning raw match telemetry into scouting and coaching intelligence that teams can apply directly in preparation workflows. The platform is now actively used by 10+ semi-professional and professional Valorant teams, which has validated both the technical direction and real-world value of what we built.",
      "I developed core full-stack systems across React, TypeScript, Vite, Node.js, and Express, including match search, team/player performance analytics, map-level breakdowns, and round-by-round tactical views. I also built key parts of the data pipeline that ingests and normalizes large GRID.gg JSON/JSONL event streams into structured analytics for dashboards and reports. As the platform grew, I drove API and service modularization so statistics, scouting, and series-state processing stayed maintainable and extensible.",
      "I designed and implemented the AI reporting workflow that converts structured match digests into tactical insights and long-form scouting reports. I owned prompt engineering, output schema consistency, and multi-model integration across Gemini, OpenAI, Claude, and Ollama to keep report quality actionable and reliable. I also implemented asynchronous job orchestration with progress tracking and cancellation handling for long-running report generation, while collaborating closely with my two partners on product roadmap, user feedback loops, and iterative delivery."
    ]
  },
  {
    id: "alphabiz",
    title: "AlphaBiz",
    subtitle: "IT Service Business",
    summary: "An independently owned IT service business serving 148+ clients, specializing in technical support, system optimization, and performance tuning.",
    tech: ["Windows", "Hardware", "Networking", "System Optimization"],
    description: [
      "AlphaBiz is an independently owned IT service business I founded and operated, focused on delivering hands on technical support and performance optimization solutions to a diverse client base. Over the course of building the business, I worked directly with more than 148 clients, diagnosing and resolving a wide range of hardware and software issues. These included custom PC assembly, operating system recovery, driver troubleshooting, and system instability caused by conflicting components or configurations. Each project required a tailored approach, balancing technical precision with clear communication to ensure clients understood both the problem and the solution.",
      "In addition to technical execution, I managed every aspect of business operations from the ground up. This included pricing strategy, service packaging, customer acquisition, and long term client relationship management. Within the first two years, AlphaBiz generated over $4,000 in revenue, achieved without external funding or partnerships. This experience strengthened my ability to operate independently, make data driven decisions, and maintain a high standard of service while scaling workload efficiently. I also developed strong client trust through consistent delivery, transparency, and responsiveness.",
      "A key area of specialization within AlphaBiz was system optimization for performance sensitive environments, particularly for competitive gaming and high demand applications. I fine tuned Windows operating systems, adjusted driver configurations, and optimized hardware settings to reduce input latency and improve frame rate consistency. This required a detailed understanding of how software, firmware, and hardware interact under load. By focusing on measurable performance gains, I was able to deliver noticeable improvements that directly enhanced user experience, reinforcing both technical credibility and client satisfaction."
    ]
  }
];
