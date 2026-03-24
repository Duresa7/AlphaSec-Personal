"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface HtopProcess {
  pid: number;
  user: string;
  pri: number;
  virt: string;
  res: string;
  state: "R" | "S";
  cpuBase: number;
  memBase: number;
  time: string;
  command: string;
  label: string;
}

const processes: HtopProcess[] = [
  { pid: 1842, user: "duresa", pri: 20, virt: "2.1G", res: "892M", state: "R", cpuBase: 18, memBase: 22, time: "847:12.04", command: "/usr/sbin/pveproxy", label: "Proxmox VE" },
  { pid: 2156, user: "wazuh", pri: 20, virt: "1.8G", res: "640M", state: "R", cpuBase: 24, memBase: 16, time: "612:33.18", command: "/var/ossec/bin/wazuh-manager", label: "Wazuh SIEM" },
  { pid: 2384, user: "duresa", pri: 15, virt: "680M", res: "245M", state: "R", cpuBase: 12, memBase: 6, time: "445:08.92", command: "/usr/bin/suricata -c /etc/suricata/suricata.yaml", label: "Suricata IDS" },
  { pid: 2501, user: "root", pri: 20, virt: "42M", res: "18M", state: "R", cpuBase: 2, memBase: 0.5, time: "298:44.11", command: "/usr/bin/wireguard-go wg0", label: "WireGuard VPN" },
  { pid: 2789, user: "duresa", pri: 20, virt: "156M", res: "84M", state: "R", cpuBase: 6, memBase: 2, time: "512:19.55", command: "/usr/bin/cloudflared tunnel run", label: "Cloudflare Tunnel" },
  { pid: 3042, user: "n8n", pri: 20, virt: "920M", res: "340M", state: "S", cpuBase: 4, memBase: 8, time: "189:02.77", command: "/usr/bin/node /usr/lib/n8n/n8n", label: "n8n Automation" },
  { pid: 3198, user: "caddy", pri: 20, virt: "128M", res: "52M", state: "R", cpuBase: 3, memBase: 1, time: "401:56.33", command: "/usr/bin/caddy run --config /etc/caddy/Caddyfile", label: "Caddy Proxy" },
  { pid: 3456, user: "root", pri: 10, virt: "2.4G", res: "1.1G", state: "R", cpuBase: 8, memBase: 28, time: "723:41.09", command: "/usr/bin/qemu-system-x86_64 --enable-kvm", label: "QEMU/KVM" },
  { pid: 3612, user: "duresa", pri: 20, virt: "310M", res: "128M", state: "S", cpuBase: 1, memBase: 3, time: "67:22.41", command: "/usr/bin/python3 /opt/enrichment/pipeline.py", label: "Alert Pipeline" },
  { pid: 3801, user: "root", pri: 20, virt: "68M", res: "24M", state: "S", cpuBase: 1, memBase: 0.6, time: "334:15.08", command: "/usr/sbin/fail2ban-server -xf start", label: "Fail2ban" },
];

function CpuBar({ value, color }: { value: number; color: string }) {
  const blocks = 20;
  const filled = Math.round((value / 100) * blocks);
  return (
    <span className="font-mono text-[11px]">
      [
      <span className={color}>{"█".repeat(Math.min(filled, blocks))}</span>
      <span className="text-muted/20">{"░".repeat(Math.max(0, blocks - filled))}</span>
      {" "}
      <span className="text-muted/60">{value.toFixed(1)}%</span>
      ]
    </span>
  );
}

export function HomelabHtop() {
  const [cpuValues, setCpuValues] = useState<number[]>([32, 28, 19, 24]);
  const [memValue, setMemValue] = useState(62);
  const [procCpu, setProcCpu] = useState<number[]>(processes.map((p) => p.cpuBase));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCpuValues((prev) =>
        prev.map((v) => Math.max(5, Math.min(95, v + (Math.random() - 0.5) * 8)))
      );
      setMemValue((prev) => Math.max(40, Math.min(80, prev + (Math.random() - 0.5) * 3)));
      setProcCpu((prev) =>
        prev.map((v, i) => {
          const base = processes[i].cpuBase;
          return Math.max(0.5, Math.min(base * 2, v + (Math.random() - 0.5) * base * 0.4));
        })
      );
    }, 1500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const uptimeStart = new Date("2024-01-15");
  const now = new Date();
  const uptimeDays = Math.floor((now.getTime() - uptimeStart.getTime()) / (1000 * 60 * 60 * 24));

  const running = processes.filter((p) => p.state === "R").length;
  const sleeping = processes.filter((p) => p.state === "S").length;

  return (
    <div className="network-panel overflow-hidden">
      {/* htop header */}
      <div className="border-b border-line/60 bg-background/80 px-4 py-3 font-mono text-[11px]">
        <div className="grid gap-1">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-muted/50">CPU[1]</span>
            <CpuBar value={cpuValues[0]} color="text-accent" />
            <span className="text-muted/50">CPU[2]</span>
            <CpuBar value={cpuValues[1]} color="text-accent" />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-muted/50">CPU[3]</span>
            <CpuBar value={cpuValues[2]} color="text-accent" />
            <span className="text-muted/50">CPU[4]</span>
            <CpuBar value={cpuValues[3]} color="text-accent" />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-muted/50">Mem</span>
            <CpuBar value={memValue} color="text-accent" />
            <span className="text-muted/50">Swp</span>
            <CpuBar value={3.2} color="text-accent" />
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 text-muted/50">
          <span>
            Tasks: <span className="text-foreground/80">{processes.length}</span>,{" "}
            <span className="text-accent">{running} running</span>,{" "}
            {sleeping} sleeping
          </span>
          <span>
            Uptime: <span className="text-foreground/80">{uptimeDays}d</span>
          </span>
          <span className="hidden sm:inline">
            duresa@proxmox
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div className="border-b border-accent/20 bg-accent-dim/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-accent/80">
        <div className="grid grid-cols-[50px_60px_1fr_50px_50px] gap-1 sm:grid-cols-[50px_60px_50px_60px_60px_1fr_50px_50px]">
          <span>PID</span>
          <span>USER</span>
          <span className="hidden sm:block">PRI</span>
          <span className="hidden sm:block">VIRT</span>
          <span className="hidden sm:block">RES</span>
          <span>COMMAND</span>
          <span className="text-right">CPU%</span>
          <span className="text-right">MEM%</span>
        </div>
      </div>

      {/* Process rows */}
      <div className="divide-y divide-line/20 px-4">
        {processes.map((proc, i) => (
          <div
            key={proc.pid}
            className={cn(
              "grid grid-cols-[50px_60px_1fr_50px_50px] gap-1 py-1.5 font-mono text-[11px] transition-colors sm:grid-cols-[50px_60px_50px_60px_60px_1fr_50px_50px]",
              "hover:bg-accent-dim/15",
              proc.state === "R" ? "text-foreground/85" : "text-muted/60"
            )}
          >
            <span className="text-accent/60">{proc.pid}</span>
            <span>{proc.user}</span>
            <span className="hidden sm:block text-muted/40">{proc.pri}</span>
            <span className="hidden sm:block text-muted/50">{proc.virt}</span>
            <span className="hidden sm:block text-muted/50">{proc.res}</span>
            <span className="truncate" title={proc.command}>
              {proc.command}
            </span>
            <span className={cn(
              "text-right tabular-nums",
              procCpu[i] > 15 ? "text-warning" : procCpu[i] > 5 ? "text-accent" : "text-muted/60"
            )}>
              {procCpu[i].toFixed(1)}
            </span>
            <span className="text-right tabular-nums text-muted/60">
              {proc.memBase.toFixed(1)}
            </span>
          </div>
        ))}
      </div>

      {/* F-key footer */}
      <div className="flex flex-wrap gap-1 border-t border-line/50 bg-background/80 px-4 py-2 font-mono text-[10px]">
        {["Help", "Setup", "Search", "Filter", "Tree", "SortBy", "Nice", "Kill", "Quit"].map((label, i) => (
          <span key={label} className="flex items-center gap-0.5">
            <span className="bg-accent-dim/50 px-1 text-accent">F{i + 1}</span>
            <span className="text-muted/50">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
