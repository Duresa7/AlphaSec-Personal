"use client";

import { useEffect, useState } from "react";
import { skills, type SkillCategory } from "@/content/skills";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { cn } from "@/lib/utils";

const hostMap: Record<string, { ip: string; hostname: string }> = {
  "Programming / Scripting": { ip: "10.10.1.1", hostname: "dev-tools.local" },
  "Security Tools": { ip: "10.10.2.1", hostname: "sec-ops.local" },
  "Cloud & Infrastructure": { ip: "10.10.3.1", hostname: "cloud-infra.local" },
  "Networking & Platforms": { ip: "10.10.4.1", hostname: "net-platform.local" },
  "Frameworks & Concepts": { ip: "10.10.5.1", hostname: "framework.local" },
  "AI / LLM Tools": { ip: "10.10.6.1", hostname: "ai-engine.local" },
};

const portMap: Record<string, number[]> = {
  "Programming / Scripting": [8080, 3000, 4200, 80, 443, 5432, 3306, 1433],
  "Security Tools": [8089, 9997, 443, 1514, 8834, 2947, 4444, 514, 2055, 9090, 9999, 5601, 5672, 6379, 8443],
  "Cloud & Infrastructure": [443, 5000, 8500, 2376, 8006, 8080, 51820],
  "Networking & Platforms": [8443, 2019, 22, 22, 22, 22, 3389, 5900, 23],
  "Frameworks & Concepts": [514, 514, 443, 8834, 389, 443, 9997, 4444],
  "AI / LLM Tools": [443, 443, 443, 443, 5678, 443],
};

const serviceMap: Record<string, string> = {
  Python: "python-dev 3.12",
  Java: "openjdk 21.0",
  TypeScript: "ts-node 10.9",
  HTML: "http-server 14.1",
  CSS: "style-engine 4.0",
  PowerShell: "pwsh 7.4",
  Bash: "bash 5.2",
  SQL: "postgresql 16.1",
  Splunk: "splunkd 9.2",
  "IBM QRadar": "qradar-console 7.5",
  "Microsoft Sentinel": "sentinel-agent 2.1",
  Wazuh: "wazuh-manager 4.7",
  Nessus: "nessusd 10.7",
  Snort: "snort3 3.1",
  Metasploit: "msfrpcd 6.3",
  Nmap: "nmap-nse 7.94",
  Wireshark: "tshark 4.2",
  Suricata: "suricata 7.0",
  Autopsy: "autopsy 4.21",
  Velociraptor: "velociraptor 0.7",
  Volatility: "vol3 2.5",
  MISP: "misp-core 2.4",
  "MITRE Caldera": "caldera 5.0",
  "AWS (Lambda, S3, API Gateway, DynamoDB, SES, CloudFront, EventBridge)": "aws-cli 2.15",
  Azure: "az-cli 2.58",
  GCloud: "gcloud 464.0",
  Docker: "dockerd 25.0",
  "Proxmox VE": "pveproxy 8.1",
  Cloudflare: "cloudflared 2024.2",
  WireGuard: "wireguard 1.0",
  UniFi: "unifi-controller 8.0",
  Caddy: "caddy 2.7",
  "Kali Linux": "kali-rolling 2024.1",
  "Red Hat Linux": "rhel 9.3",
  Ubuntu: "ubuntu-server 22.04",
  Debian: "debian 12.4",
  Windows: "win-svc 11.0",
  macOS: "darwin 14.3",
  Cisco: "ios-xe 17.12",
  "Incident Response": "ir-framework 3.0",
  "Log Analysis": "log-analyzer 2.1",
  "Threat Detection": "threat-engine 4.5",
  "Vulnerability Management": "vuln-mgr 3.2",
  RBAC: "rbac-policy 2.0",
  "Zero-Trust": "ztna-core 1.5",
  "SIEM Administration": "siem-admin 5.0",
  "Digital Forensics": "forensics-kit 4.1",
  "Anthropic Claude": "claude-api 4.0",
  "Google Gemini": "gemini-api 1.5",
  "OpenAI Codex": "codex-api 4.0",
  "Vertex AI": "vertex-sdk 1.43",
  n8n: "n8n-engine 1.30",
  "Microsoft Foundry": "foundry-sdk 1.0",
};

function getProtocol(port: number): string {
  if ([22, 23, 514, 2947].includes(port)) return "tcp";
  if ([443, 8443, 8834].includes(port)) return "tcp";
  return "tcp";
}

interface NmapHostProps {
  category: SkillCategory;
  isVisible: boolean;
  startDelay: number;
}

function NmapHost({ category, isVisible, startDelay }: NmapHostProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const host = hostMap[category.label] || { ip: "10.10.0.1", hostname: "unknown.local" };
  const ports = portMap[category.label] || [];
  const totalLines = category.items.length + 2; // header + items + footer

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= totalLines) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 70);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [isVisible, startDelay, totalLines]);

  return (
    <div className="mb-6 last:mb-0">
      {/* Host header */}
      <div
        className={cn(
          "transition-opacity duration-200",
          visibleLines >= 1 ? "opacity-100" : "opacity-0"
        )}
      >
        <p className="font-mono text-xs">
          <span className="text-muted/50">Nmap scan report for </span>
          <span className="text-foreground">{host.hostname}</span>
          <span className="text-muted/40"> ({host.ip})</span>
        </p>
        <p className="font-mono text-[11px] text-muted/40">
          PORT{"      "}STATE{"   "}SERVICE{"         "}VERSION
        </p>
      </div>

      {/* Port/service rows */}
      {category.items.map((item, i) => {
        const port = ports[i] || 8080 + i;
        const protocol = getProtocol(port);
        const service = serviceMap[item] || item.toLowerCase().replace(/\s+/g, "-");
        const portStr = `${port}/${protocol}`;

        return (
          <div
            key={item}
            className={cn(
              "group cursor-default font-mono text-xs transition-all duration-200",
              visibleLines >= i + 2 ? "opacity-100" : "opacity-0",
              "hover:bg-accent-dim/20"
            )}
          >
            <span className="text-muted/60">{portStr.padEnd(10)}</span>
            <span className="text-accent font-medium">open{"   "}</span>
            <span className="text-foreground/80 group-hover:text-foreground">{service}</span>
          </div>
        );
      })}

      {/* Host footer */}
      <div
        className={cn(
          "mt-1 transition-opacity duration-300",
          visibleLines >= totalLines ? "opacity-100" : "opacity-0"
        )}
      >
        <p className="font-mono text-[11px] text-muted/30">
          {category.items.length} services detected
        </p>
      </div>
    </div>
  );
}

export function NmapScanCard() {
  const [isVisible, setIsVisible] = useState(false);

  const totalPorts = skills.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div
      ref={(el) => {
        if (!el) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(el);
      }}
    >
      <TerminalPanel
        title="nmap -sV --top-ports 100 *.duresa.local"
        subtitle="service enumeration scan"
        status="scanning"
        bodyClassName="p-5 md:p-6"
      >
        {/* Scan header */}
        <div className={cn(
          "mb-5 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <p className="font-mono text-[11px] text-muted/50">
            Starting Nmap 7.94 ( https://nmap.org )
          </p>
        </div>

        {/* Hosts */}
        {skills.map((category, i) => (
          <NmapHost
            key={category.label}
            category={category}
            isVisible={isVisible}
            startDelay={i * 400}
          />
        ))}

        {/* Scan footer */}
        <div
          className={cn(
            "mt-4 border-t border-line/50 pt-3 transition-opacity duration-500",
            isVisible ? "opacity-100 delay-[3000ms]" : "opacity-0"
          )}
        >
          <p className="font-mono text-[11px] text-accent/70">
            Nmap done: {skills.length} hosts scanned ({totalPorts} services) in 4.28 seconds
          </p>
        </div>
      </TerminalPanel>
    </div>
  );
}
