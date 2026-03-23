export interface Project {
  name: string;
  stack: string[];
  period: string;
  bullets: string[];
  link?: string;
  diagramUrl?: string;
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    name: "Homelab",
    stack: [
      "Proxmox VE",
      "Wazuh",
      "Suricata",
      "Cloudflare",
      "WireGuard",
      "Linux",
      "Docker",
      "Python",
      "Anthropic API",
    ],
    period: "Jan 2024",
    bullets: [
      "Architected a multi-VLAN environment (MGMT, SERVERS, DMZ) on Proxmox using UniFi; enforced zone-based access control and WireGuard VPN with least-privilege firewall policy for remote management.",
      "Deployed Wazuh SIEM with live agents for FIM, SCA, and vulnerability detection; correlated alerts with Suricata IDS and syslog to detect brute-force attempts, port scans, and lateral movement.",
      "Hardened a production web environment using Cloudflare Tunnel (zero open WAN ports), WAF rules, rate limiting, and Caddy reverse proxy monitored end-to-end by Wazuh.",
      "Built an n8n automation pipeline that ingests Wazuh alerts, enriches them with VirusTotal and IP reputation lookups, passes correlated findings to Claude API to classify severity, and automatically isolates compromised hosts.",
    ],
    diagramUrl:
      "https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=B3B3B3&edit=_blank&layers=1&nav=1&title=Homala.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1O2_BcWAGTMvv9xJv3GbOb5rwFLYhuv7Z%26export%3Ddownload",
  },
  {
    name: "AlphaSec United",
    stack: [
      "React",
      "TypeScript",
      "Three.js",
      "Supabase",
      "Zustand",
      "Vercel",
    ],
    period: "Nov 2025",
    bullets: [
      "Built and deployed a full-stack interactive mapping platform for a 200+ member community with role-based access control (RBAC), PKCE authentication, and RLS policies across all tables to prevent privilege escalation.",
      "Implemented security headers (CSP, HSTS), comprehensive audit logging on all sensitive operations, and conducted a full 32-category security audit with zero findings.",
    ],
  },
  {
    name: "ValoBrain",
    stack: [
      "React 19",
      "Node.js",
      "TypeScript",
      "Express",
      "Gemini AI",
      "Tailwind CSS",
    ],
    period: "Feb 2026",
    bullets: [
      "Developed a full-stack esports analytics dashboard at the Cloud9 x JetBrains Hackathon, delivering real-time match insights for Valorant teams and scouts using React, Node.js, and TypeScript.",
      "Managed agile workflow end-to-end in Jira, organizing backlog and sprint tasks to ensure on-time delivery of a functional end-to-end product.",
    ],
    link: "https://github.com/Duresa7",
    videoUrl: "/Valobrain-vid.mp4",
  },
];
