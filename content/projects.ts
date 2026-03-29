import { projectLinks } from "@/content/site";

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
      "Proxmox",
      "Wazuh",
      "Suricata",
      "WireGuard",
      "Cloudflare",
      "n8n",
      "Python",
    ],
    period: "January 2024",
    bullets: [
      "Architected segmented homelab on Proxmox with multi-VLAN isolation (MGMT/SERVERS/DMZ), UniFi ACLs, WireGuard VPN, Cloudflare Tunnel with zero open WAN ports, Caddy reverse proxy, and end-to-end monitoring via Wazuh SIEM and Suricata IDS correlation.",
      "Built automated threat-response pipeline via n8n: ingests Wazuh alerts, enriches IOCs via VirusTotal and IP feeds, invokes Claude API for severity classification, and autonomously quarantines compromised hosts.",
    ],
    diagramUrl:
      "https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=B3B3B3&edit=_blank&layers=1&nav=1&title=Homala.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1O2_BcWAGTMvv9xJv3GbOb5rwFLYhuv7Z%26export%3Ddownload",
  },
  {
    name: "AlphaSec United",
    stack: ["React", "TypeScript", "Three.js", "Supabase", "AWS"],
    period: "November 2025",
    bullets: [
      "Built and deployed full-stack interactive mapping platform for 200+ member community; implemented RBAC, PKCE authentication, and row-level security policies across all tables.",
      "Conducted 32-category security audit with zero critical findings; implemented security headers (CSP, HSTS) and comprehensive audit logging on all sensitive operations.",
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
    link: projectLinks.valoBrain,
    videoUrl: "/Valobrain-vid.mp4",
  },
];
