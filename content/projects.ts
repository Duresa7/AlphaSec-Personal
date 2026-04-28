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
    name: "AlphaSec Home Datacenter",
    stack: [
      "Proxmox VE",
      "UniFi",
      "Cloudflare",
      "Ansible",
      "WireGuard",
      "Caddy",
      "Traefik",
      "Wazuh",
      "Suricata",
      "Splunk",
      "n8n",
    ],
    period: "January 2024",
    bullets: [
      "Engineered multi-VLAN Proxmox datacenter hosting 9 production workloads across 7 network segments, enforcing zone-based firewall policy with zero open WAN ports via Cloudflare Tunnel ingress.",
      "Implemented two-layer defense-in-depth by pairing UniFi zone firewalls with a Proxmox datacenter firewall group restricting SSH and web-UI access to an explicit allow list, with WireGuard VPN as the sole off-network admin path.",
      "Designed wildcard DNS routing through Cloudflare Tunnel, Caddy, and Traefik, reducing new application deployment to a single domain entry in the control plane.",
      "Configured centralized SIEM pipeline by forwarding UniFi syslog data to Splunk, enabling real-time log aggregation, correlation, and visibility into network and host activity.",
      "Built automated threat-response pipeline via n8n that ingests Wazuh alerts, enriches IOCs through VirusTotal and IP feeds, invokes Claude API for severity classification, and autonomously quarantines compromised hosts.",
    ],
    diagramUrl:
      "https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=B3B3B3&edit=_blank&layers=1&nav=1&title=AlphaSec-Home-Datacenter.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1O2_BcWAGTMvv9xJv3GbOb5rwFLYhuv7Z%26export%3Ddownload",
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
  {
    name: "KADI Active Directory Lab",
    stack: [
      "Windows Server 2025",
      "AD DS",
      "Group Policy",
      "PowerShell",
    ],
    period: "November 2025",
    bullets: [
      "Built Windows Server 2025 forest with primary and secondary domain controllers, designing organizational unit hierarchy and enterprise naming conventions for users, admins, service accounts, workstations, and security groups.",
      "Authored and deployed Group Policy Objects including a custom password policy and a restrictive managed-user policy disabling command prompt, registry editor, and control panel, validated with gpresult and dcdiag.",
    ],
  },
  {
    name: "Azure Hybrid Infrastructure Lab",
    stack: [
      "Entra ID",
      "Azure Files",
      "Azure Backup",
      "Azure Site Recovery",
    ],
    period: "February 2025",
    bullets: [
      "Configured Microsoft Entra ID tenant and deployed a cloud-hosted domain controller on Azure IaaS as an alternative to on-premises-only AD, testing identity synchronization and authentication flows across hybrid environments.",
      "Implemented hybrid file services with Azure Files and evaluated disaster recovery using Azure Backup and Azure Site Recovery, comparing recovery objectives against on-premises alternatives.",
    ],
  },
];
