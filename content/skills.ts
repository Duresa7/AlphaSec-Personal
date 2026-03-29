export interface SkillCategory {
  label: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    label: "Technical",
    items: ["Python", "PowerShell", "Bash", "SQL"],
  },
  {
    label: "Systems and Tools",
    items: [
      "Active Directory",
      "Group Policy",
      "Microsoft 365",
      "Remote Desktop",
      "TeamViewer",
      "AnyDesk",
      "Jira",
    ],
  },
  {
    label: "Cloud and Infrastructure",
    items: [
      "AWS (Lambda, S3, API Gateway, DynamoDB, SES, CloudFront, EventBridge)",
      "Azure",
      "Docker",
      "Proxmox VE",
      "VMware",
      "VirtualBox",
    ],
  },
  {
    label: "Networking and Platforms",
    items: [
      "TCP/IP",
      "DNS",
      "DHCP",
      "UniFi",
      "WireGuard",
      "Caddy",
      "Cisco",
      "Kali Linux",
      "Red Hat Linux",
      "Ubuntu",
      "Debian",
      "Windows",
      "macOS",
    ],
  },
  {
    label: "AI/LLM Tools",
    items: [
      "Claude",
      "Gemini",
      "OpenAI Codex",
      "Vertex AI",
      "n8n",
      "Microsoft Foundry",
    ],
  },
];
