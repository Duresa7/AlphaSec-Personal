export interface SkillCategory {
  label: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    label: "Programming and Scripting",
    items: ["Python", "PowerShell", "Bash", "SQL"],
  },
  {
    label: "Security Tools",
    items: [
      "Wazuh",
      "Splunk",
      "Suricata",
      "Microsoft Sentinel",
      "Nmap",
      "Wireshark",
      "Metasploit",
      "Burp Suite",
      "Snort",
      "Nessus",
    ],
  },
  {
    label: "Cloud and Infrastructure",
    items: [
      "AWS (Lambda, S3, API Gateway, DynamoDB, IAM)",
      "Azure (Entra ID, Azure Files, Azure Backup, Site Recovery)",
      "Docker",
      "Proxmox VE",
      "VMware",
    ],
  },
  {
    label: "Networking",
    items: [
      "TCP/IP",
      "DNS",
      "DHCP",
      "WireGuard",
      "Cloudflare Tunnel",
      "UniFi",
      "Caddy",
      "Cisco",
      "Traefik",
      "pfSense",
      "VLANs",
      "IPSec",
    ],
  },
  {
    label: "Systems and Tools",
    items: [
      "Active Directory",
      "Group Policy",
      "Microsoft 365",
      "Git/GitHub",
      "Jira",
    ],
  },
  {
    label: "Operating Systems",
    items: [
      "Windows (11, Server 2022/2025)",
      "RHEL",
      "Ubuntu",
      "Debian",
      "Kali Linux",
      "macOS",
    ],
  },
  {
    label: "AI and Automation",
    items: [
      "n8n",
      "Claude API",
      "Vertex AI",
      "Gemini",
      "OpenAI",
      "Microsoft Foundry",
    ],
  },
];
