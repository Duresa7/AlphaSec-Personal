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
      "Operated sole IT function for 30-person nonprofit, administering Microsoft 365 Business Premium tenant, on-premises Windows Server domain controller, UniFi network stack, and endpoint fleet across the organization.",
      "Architected hybrid identity by integrating on-premises Active Directory with Microsoft Entra ID via Entra Connect, enabling single sign-on, multi-factor authentication, and conditional access policies across all Microsoft 365 workloads.",
      "Deployed Microsoft Intune and Microsoft Defender to manage endpoints across the staff fleet, enforcing compliance policies, security baselines, and configuration profiles while protecting against phishing, malware, and data exfiltration across SharePoint, OneDrive, and Exchange.",
      "Automated new-employee onboarding through domain-join and provisioning scripts that configured Group Policy registry settings, installed standard software, and assigned Microsoft 365 licenses, standardizing laptop setup across the staff fleet and eliminating manual configuration.",
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
      "Directed university esports program spanning varsity and JV Valorant teams of 13 players across two full seasons, overseeing recruitment, training, budget, and performance.",
      "Led program to back-to-back Peach Belt Conference Championship titles (2023, 2025), earning $10,000 in prize money and securing a CECC bid across both wins.",
      "Achieved 2nd place at College Valorant South Fall 2023 ($1,000) and 3rd at NACE Starleague Fall 2023 ($625); reached top 16 at YFP Lockdown Arena, NACE, and CECC 2025.",
      "Coached individual players through weekly development sessions and led mid-competition tactical adjustments, pairing counter-strat frameworks and VOD review processes with opponent-specific game plans against top collegiate and semi-professional organizations.",
    ],
  },
  {
    company: "AlphaBiz (Freelance IT)",
    location: "Takoma Park, MD",
    role: "IT Technician / Owner",
    period: "February 2022 - June 2025",
    bullets: [
      "Diagnosed and resolved hardware, software, and OS-level issues for 108 clients, including driver conflicts, boot failures, malware removal, and data recovery.",
      "Managed full-service client lifecycle independently: intake, troubleshooting, resolution, and communication, generating $4,148 in revenue over two years.",
      "Performed Windows system hardening and optimization across diverse client environments, including OS configuration, driver management, and security baseline tuning.",
    ],
  },
];
