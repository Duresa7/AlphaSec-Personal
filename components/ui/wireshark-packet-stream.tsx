"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Packet {
  frame: number;
  time: string;
  src: string;
  dst: string;
  protocol: string;
  length: number;
  info: string;
  colorClass: string;
}

const protocolColors: Record<string, string> = {
  HTTPS: "bg-accent/8 text-accent/80",
  HTTP: "bg-accent/8 text-accent/70",
  DNS: "bg-sky-400/8 text-sky-400/70",
  SSH: "bg-purple-400/8 text-purple-400/70",
  TCP: "bg-muted/5 text-muted/50",
  TLS: "bg-accent/6 text-accent/60",
  SIEM: "bg-warning/8 text-warning/70",
  IDS: "bg-red-400/8 text-red-400/60",
  VPN: "bg-indigo-400/8 text-indigo-400/70",
};

function generatePackets(): Packet[] {
  const entries: Array<{ protocol: string; info: string; src: string; dst: string }> = [
    { protocol: "HTTPS", info: "GET /api/skills HTTP/2 200 OK", src: "10.10.1.42", dst: "10.10.2.1" },
    { protocol: "DNS", info: "Standard query A sec-ops.local", src: "10.10.0.10", dst: "1.1.1.1" },
    { protocol: "SSH", info: "Client: SSH-2.0-OpenSSH_9.6", src: "10.10.1.42", dst: "10.10.0.1" },
    { protocol: "SIEM", info: "wazuh-agent: FIM alert /etc/passwd modified", src: "10.10.3.15", dst: "10.10.2.1" },
    { protocol: "TCP", info: "[SYN] Seq=0 Win=65535 Len=0 MSS=1460", src: "10.10.1.42", dst: "10.10.4.1" },
    { protocol: "HTTPS", info: "POST /v1/messages HTTP/2 (application/json)", src: "10.10.0.1", dst: "api.anthropic.com" },
    { protocol: "IDS", info: "ET SCAN Nmap Scripting Engine detected", src: "192.168.1.100", dst: "10.10.2.1" },
    { protocol: "DNS", info: "Standard query A cloud-infra.local", src: "10.10.0.10", dst: "1.1.1.1" },
    { protocol: "TLS", info: "Client Hello, TLSv1.3, cipher suites [16]", src: "10.10.1.42", dst: "10.10.5.1" },
    { protocol: "VPN", info: "WireGuard: Handshake initiation", src: "10.10.1.42", dst: "10.10.0.1" },
    { protocol: "HTTPS", info: "GET /dashboard HTTP/2 200 OK", src: "10.10.1.42", dst: "10.10.3.1" },
    { protocol: "SIEM", info: "suricata: Alert TCP flood detected src=192.168.1.100", src: "10.10.3.15", dst: "10.10.2.1" },
    { protocol: "TCP", info: "[ACK] Seq=1 Ack=1 Win=65535 Len=0", src: "10.10.4.1", dst: "10.10.1.42" },
    { protocol: "DNS", info: "Standard query AAAA ai-engine.local", src: "10.10.0.10", dst: "8.8.8.8" },
    { protocol: "SSH", info: "Server: SSH-2.0-OpenSSH_9.6 kex_init", src: "10.10.0.1", dst: "10.10.1.42" },
    { protocol: "HTTPS", info: "PUT /api/enrichment HTTP/2 201 Created", src: "10.10.0.1", dst: "10.10.2.1" },
    { protocol: "IDS", info: "GPL ATTACK_RESPONSE id check returned root", src: "10.10.3.15", dst: "10.10.2.1" },
    { protocol: "TCP", info: "[FIN, ACK] Seq=342 Ack=891 Win=65535", src: "10.10.1.42", dst: "10.10.5.1" },
    { protocol: "VPN", info: "WireGuard: Transport data, counter=48291", src: "10.10.0.1", dst: "10.10.1.42" },
    { protocol: "TLS", info: "Application Data, TLSv1.3 [256 bytes]", src: "10.10.5.1", dst: "10.10.1.42" },
  ];

  return entries.map((entry, i) => ({
    frame: 48291 + i,
    time: (i * 0.034).toFixed(6),
    src: entry.src,
    dst: entry.dst,
    protocol: entry.protocol,
    length: Math.floor(Math.random() * 1200) + 60,
    info: entry.info,
    colorClass: protocolColors[entry.protocol] || protocolColors.TCP,
  }));
}

export function WiresharkPacketStream() {
  const [paused, setPaused] = useState(false);
  const [packets] = useState(() => generatePackets());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || !scrollRef.current) return;

    const el = scrollRef.current;
    let animFrame: number;
    let lastTime = 0;
    const speed = 0.3; // px per ms

    function animate(time: number) {
      if (lastTime) {
        const delta = time - lastTime;
        el.scrollTop += speed * delta;

        // Reset scroll when reaching bottom
        if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
          el.scrollTop = 0;
        }
      }
      lastTime = time;
      animFrame = requestAnimationFrame(animate);
    }

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [paused]);

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="network-panel overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Filter bar */}
          <div className="flex items-center gap-2 border-b border-line/60 bg-background/80 px-4 py-2">
            <span className="font-mono text-[10px] text-accent/50">filter:</span>
            <span className="font-mono text-[11px] text-accent/80">
              tcp.port == 443 &amp;&amp; ip.src == 10.10.1.42
            </span>
            <div className="ml-auto flex items-center gap-2">
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                paused ? "bg-warning" : "bg-accent animate-pulse"
              )} />
              <span className="font-mono text-[10px] text-muted/40">
                {paused ? "paused" : "capturing"}
              </span>
            </div>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[55px_70px_1fr_1fr_55px_50px_2fr] gap-1 border-b border-accent/15 bg-accent-dim/20 px-4 py-1 font-mono text-[9px] uppercase tracking-wider text-accent/60 md:grid-cols-[55px_80px_110px_110px_55px_50px_1fr]">
            <span>No.</span>
            <span>Time</span>
            <span className="hidden md:block">Source</span>
            <span className="hidden md:block">Destination</span>
            <span>Proto</span>
            <span>Len</span>
            <span>Info</span>
          </div>

          {/* Packet rows */}
          <div
            ref={scrollRef}
            className="h-[200px] overflow-hidden"
          >
            {/* Duplicate packets for continuous scrolling */}
            {[...packets, ...packets].map((pkt, i) => (
              <div
                key={i}
                className={cn(
                  "grid grid-cols-[55px_70px_1fr_1fr_55px_50px_2fr] gap-1 px-4 py-1 font-mono text-[11px] transition-colors md:grid-cols-[55px_80px_110px_110px_55px_50px_1fr]",
                  pkt.colorClass,
                  "hover:!bg-accent-dim/20 hover:!text-foreground"
                )}
              >
                <span className="tabular-nums text-muted/40">{pkt.frame}</span>
                <span className="tabular-nums">{pkt.time}</span>
                <span className="hidden truncate md:block">{pkt.src}</span>
                <span className="hidden truncate md:block">{pkt.dst}</span>
                <span className="font-medium">{pkt.protocol}</span>
                <span className="tabular-nums text-muted/40">{pkt.length}</span>
                <span className="truncate">{pkt.info}</span>
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between border-t border-line/50 bg-background/80 px-4 py-1.5 font-mono text-[10px] text-muted/40">
            <span>Packets: {packets.length} &middot; Displayed: {packets.length}</span>
            <span>Profile: duresa-homelab</span>
          </div>
        </div>
      </div>
    </div>
  );
}
