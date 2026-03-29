export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    company: "Waabee Self-Help Association",
    location: "Silver Spring, MD",
    role: "IT Support Technician",
    period: "January 2024 - December 2025",
    bullets: [
      "Served as sole IT specialist, independently managing all internal systems, networking, AV infrastructure, and hardware/software support.",
      "Architected and deployed serverless AWS stack (S3/CloudFront, API Gateway, Lambda, DynamoDB, SES, EventBridge), eliminating on-site servers and saving $1,800+ annually.",
      "Built automated email notification system handling event signups, subscriber storage, and scheduled reminders, eliminating all manual outreach.",
      "Deployed UniFi networking and AV solutions for 50-100+ person events across multiple venues; achieved zero downtime across all events.",
    ],
  },
  {
    company: "Nightblood Gaming",
    location: "Boston, MA",
    role: "Head Coach, Esports",
    period: "June 2024 - July 2025",
    bullets: [
      "Led professional roster in VCT Challengers League North America 2024; achieved 3rd place in Stage 3 Finals, earning $3,000 from a $25,000 prize pool.",
      "Achieved 2nd place at MFH YFP Lockdown Arena ($1,000 prize pool) outside of league play.",
      "Designed map-specific executes, counter-strategic playbooks, and opponent-tailored game plans through pre-match VOD analysis and research.",
      "Directed individual player development sessions and led real-time mid-series strategic adjustments under professional competitive pressure.",
    ],
  },
  {
    company: "Converse University",
    location: "Spartanburg, NC",
    role: "Head Coach, Esports",
    period: "July 2023 - June 2025",
    bullets: [
      "Directed full program strategy, player development, and roster management after promotion to Head Coach, overseeing varsity and JV teams of 13 players.",
      "Led program to back-to-back Peach Belt Conference Championship titles (2023, 2025); earned $10,000 in prize money and secured a CECC bid across both wins.",
      "Achieved 2nd place at College Valorant South Fall 2023 ($1,000) and 3rd at NACE Starleague Fall 2023 ($625); reached top 16 at YFP Lockdown Arena, NACE, and CECC 2025.",
      "Developed counter-strat frameworks, VOD review processes, and opponent-specific game plans against top collegiate and semi-professional organizations.",
    ],
  },
  {
    company: "AlphaBiz (Freelance IT)",
    location: "Takoma Park, MD",
    role: "IT Technician / Owner",
    period: "February 2022 - June 2025",
    bullets: [
      "Diagnosed and resolved hardware, software, and OS-level issues for 148+ clients, including driver conflicts, boot failures, malware removal, and data recovery.",
      "Managed full-service client lifecycle independently: intake, troubleshooting, resolution, and communication, generating $4,000+ in revenue over two years.",
      "Performed Windows system hardening and optimization across diverse client environments, including OS configuration, driver management, and security baseline tuning.",
    ],
  },
];
