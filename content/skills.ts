export interface SkillCategory {
  label: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    label: "Programming / Scripting",
    items: [
      "Python",
      "Java",
      "TypeScript",
      "HTML",
      "CSS",
      "PowerShell",
      "Bash",
      "SQL",
    ],
  },
  {
    label: "Security Tools",
    items: [
      "Splunk",
      "IBM QRadar",
      "Microsoft Sentinel",
      "Wazuh",
      "Nessus",
      "Snort",
      "Metasploit",
      "Nmap",
      "Wireshark",
      "Suricata",
      "Autopsy",
      "Velociraptor",
      "Volatility",
      "MISP",
      "MITRE Caldera",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    items: [
      "AWS (Lambda, S3, API Gateway, DynamoDB, SES, CloudFront, EventBridge)",
      "Azure",
      "GCloud",
      "Docker",
      "Proxmox VE",
      "Cloudflare",
      "WireGuard",
    ],
  },
  {
    label: "Networking & Platforms",
    items: [
      "UniFi",
      "Caddy",
      "Kali Linux",
      "Red Hat Linux",
      "Ubuntu",
      "Debian",
      "Windows",
      "macOS",
      "Cisco",
    ],
  },
  {
    label: "Frameworks & Concepts",
    items: [
      "Incident Response",
      "Log Analysis",
      "Threat Detection",
      "Vulnerability Management",
      "RBAC",
      "Zero-Trust",
      "SIEM Administration",
      "Digital Forensics",
    ],
  },
  {
    label: "AI / LLM Tools",
    items: [
      "Anthropic Claude",
      "Google Gemini",
      "OpenAI Codex",
      "Vertex AI",
      "n8n",
      "Microsoft Foundry",
    ],
  },
];
