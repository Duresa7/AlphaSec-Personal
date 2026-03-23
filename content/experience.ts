export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    company: "Waabee Self-Help",
    location: "Silver Spring, MD",
    role: "IT Support Technician",
    period: "Jan 2024 — Dec 2025",
    bullets: [
      "Sole IT specialist for the organization - managed all internal systems, networking, AV infrastructure, and hardware/software troubleshooting independently.",
      "Eliminated the need for on-site servers, subscription-based services, and manual setup by deploying a serverless AWS stack (S3/CloudFront, API Gateway, Lambda, DynamoDB, SES, EventBridge), saving $1,800+ annually in infrastructure costs.",
      "Built an automated email notification system handling event signups, subscriber storage, and scheduled reminders, reducing per-event setup time and eliminating manual outreach.",
      "Deployed and configured UniFi networking and AV solutions for 50-100+ person events across multiple rented venues with varying infrastructure constraints; ensured zero downtime per event.",
    ],
  },
  {
    company: "Converse University",
    location: "Spartanburg, NC",
    role: "Remote Head Varsity & Prev. Assistant Coach",
    period: "Jul 2023 — Jun 2025",
    bullets: [
      "Produced structured scouting reports against multiple opponents including professional organizations (M80, Fnatic, Cloud9 White), documenting macro/micro behavioral tendencies, individual player patterns, and map-specific counter-strategies.",
      "Developed quantitative player tendency analysis (e.g., identifying statistical positional habits) and translated raw VOD observations into structured, actionable game plans with visual map diagrams.",
      "Assisted with opponent research and player development for a collegiate esports program, contributing to scouting reports and strategic preparation across a competitive season.",
    ],
  },
  {
    company: "AlphaBiz",
    location: "Takoma Park, MD",
    role: "IT Technician / Owner",
    period: "Feb 2022 — Jun 2025",
    bullets: [
      "Diagnosed and resolved hardware and software issues for 148+ clients across custom PC builds, OS recovery, driver conflicts, and performance optimization.",
      "Generated $4,000+ in revenue within the first two years, managing all aspects of service delivery, pricing, and customer relations independently.",
      "Optimized Windows systems for competitive environments: tuned OS settings, drivers, and hardware configuration to reduce input latency and improve framerate consistency.",
    ],
  },
];
