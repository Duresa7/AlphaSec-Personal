import { certifications } from "./education";

export interface BootLine {
  text: string;
  delay: number;
  type?:
    | "info"
    | "ok"
    | "warn"
    | "error"
    | "accent"
    | "header"
    | "dim"
    | "blank";
  sound?: "beep" | "click" | "hdd";
}

export const bootSequence: BootLine[] = [
  // ── Phase 1: BIOS POST ──────────────────────────────────────
  {
    text: "AlphaSec BIOS v4.2.0 — Security Workstation",
    delay: 400,
    type: "header",
    sound: "beep",
  },
  {
    text: "Copyright (c) 2024-2026 Duresa Kadi. All rights reserved.",
    delay: 100,
    type: "dim",
  },
  { text: "", delay: 200, type: "blank" },
  { text: "Performing POST checks...", delay: 150, type: "info" },
  {
    text: "  CPU:  AMD Ryzen 9 9950X3D ........................ [ OK ]",
    delay: 60,
    type: "ok",
  },
  {
    text: "  RAM:  Corsair DDR5 32GB CL30 6000MHz ............. [ OK ]",
    delay: 50,
    type: "ok",
  },
  {
    text: "  GPU:  NVIDIA RTX 5070 Ti (MSI) ................... [ OK ]",
    delay: 40,
    type: "ok",
  },
  {
    text: "  SSD:  Samsung 990 Pro 2TB + 980 Pro 1TB .......... [ OK ]",
    delay: 50,
    type: "ok",
  },
  {
    text: "  NIC:  10GbE SFP+ (eth0) ......................... [ OK ]",
    delay: 50,
    type: "ok",
  },
  {
    text: "  TPM:  v2.0 Module ................................ [ OK ]",
    delay: 40,
    type: "ok",
  },
  {
    text: "  Secure Boot: ENABLED ............................. [ OK ]",
    delay: 40,
    type: "ok",
  },

  // ── Phase 2: GRUB ───────────────────────────────────────────
  { text: "", delay: 350, type: "blank" },
  {
    text: "GRUB 2.12 — AlphaSec Security Kernel Loader",
    delay: 200,
    type: "header",
  },
  {
    text: "  Loading kernel: alphasec-linux 6.8.0-sec ...",
    delay: 150,
    type: "info",
    sound: "hdd",
  },
  { text: "  Loading initramfs ...", delay: 100, type: "info" },
  {
    text: "  Verifying kernel signature ....................... [ OK ]",
    delay: 120,
    type: "ok",
  },

  // ── Phase 3: Kernel boot ────────────────────────────────────
  { text: "", delay: 300, type: "blank" },
  {
    text: "[    0.000000] alphasec-linux 6.8.0-sec (tty1)",
    delay: 80,
    type: "dim",
  },
  {
    text: "[    0.001204] Command line: BOOT_IMAGE=/vmlinuz-alphasec root=/dev/mapper/sec-root ro quiet",
    delay: 50,
    type: "dim",
  },
  {
    text: "[    0.142857] Security Framework initialized",
    delay: 60,
    type: "info",
  },
  {
    text: "[    0.248103] AppArmor: policy loaded — 42 profiles",
    delay: 50,
    type: "info",
  },
  {
    text: "[    0.312000] Integrity: IMA policy active",
    delay: 50,
    type: "info",
  },
  {
    text: "[    0.389211] SELinux: enforcing mode enabled",
    delay: 50,
    type: "info",
  },

  // ── Phase 4: systemd services ───────────────────────────────
  { text: "", delay: 250, type: "blank" },
  {
    text: "Starting AlphaSec Security Stack v3.1 ...",
    delay: 200,
    type: "header",
  },
  { text: "", delay: 80, type: "blank" },
  {
    text: "  [ OK ] Started networking.service",
    delay: 70,
    type: "ok",
  },
  {
    text: "  [ OK ] Started firewalld.service — iptables loaded",
    delay: 70,
    type: "ok",
  },
  {
    text: "  [ OK ] Started sshd.service — OpenSSH (key-only auth)",
    delay: 60,
    type: "ok",
  },
  {
    text: "  [ OK ] Started wireguard@wg0.service — VPN tunnel UP",
    delay: 60,
    type: "ok",
  },
  {
    text: "  [ OK ] Started docker.service — container runtime",
    delay: 60,
    type: "ok",
  },
  {
    text: "  [ OK ] Started wazuh-agent.service — SIEM agent",
    delay: 80,
    type: "ok",
  },
  {
    text: "  [ OK ] Started suricata.service — IDS/IPS engine",
    delay: 80,
    type: "ok",
  },
  {
    text: "  [ OK ] Started splunk-forwarder.service — log shipper",
    delay: 60,
    type: "ok",
  },
  {
    text: "  [ OK ] Started cloudflared.service — zero-trust tunnel",
    delay: 60,
    type: "ok",
  },
  {
    text: "  [ OK ] Started proxmox-guest-agent.service",
    delay: 50,
    type: "ok",
  },

  // ── Phase 5: alphasec-daemon ────────────────────────────────
  { text: "", delay: 300, type: "blank" },
  {
    text: "Initializing alphasec-daemon v2.4.1 ...",
    delay: 250,
    type: "accent",
  },
  {
    text: "  Loading threat intelligence feeds ................ [ OK ]",
    delay: 120,
    type: "ok",
  },
  {
    text: "  Mounting encrypted volumes (LUKS2) ............... [ OK ]",
    delay: 100,
    type: "ok",
  },
  {
    text: "  Syncing MITRE ATT&CK matrix (v14) ............... [ OK ]",
    delay: 120,
    type: "ok",
  },
  {
    text: "  Deploying honeypot sensors ....................... [ OK ]",
    delay: 100,
    type: "ok",
  },
  {
    text: "  Nmap recon module: standby ....................... [ OK ]",
    delay: 80,
    type: "ok",
  },
  {
    text: "  Wireshark capture engine: ready .................. [ OK ]",
    delay: 80,
    type: "ok",
  },
  {
    text: "  Metasploit framework: loaded ..................... [ OK ]",
    delay: 80,
    type: "ok",
  },
  {
    text: "  Zero-trust policy: ENFORCED ...................... [ OK ]",
    delay: 100,
    type: "ok",
  },
  { text: "", delay: 200, type: "blank" },
  {
    text: "All security modules operational.",
    delay: 300,
    type: "accent",
  },
  { text: "Threat level: NOMINAL", delay: 200, type: "ok" },

  // ── Phase 6: Login + MOTD ──────────────────────────────────
  { text: "", delay: 500, type: "blank" },
  { text: "alphasec login: duresa", delay: 400, type: "accent" },
  { text: "Password: ••••••••", delay: 350, type: "info" },
  { text: "", delay: 300, type: "blank" },
  {
    text: "Last login: Mon Mar 24 08:00:00 2026 from 10.10.10.1",
    delay: 200,
    type: "dim",
  },
  { text: "", delay: 200, type: "blank" },
  {
    text: "  ██████╗ ██╗   ██╗██████╗ ███████╗███████╗ █████╗",
    delay: 50,
    type: "accent",
  },
  {
    text: "  ██╔══██╗██║   ██║██╔══██╗██╔════╝██╔════╝██╔══██╗",
    delay: 40,
    type: "accent",
  },
  {
    text: "  ██║  ██║██║   ██║██████╔╝█████╗  ███████╗███████║",
    delay: 40,
    type: "accent",
  },
  {
    text: "  ██║  ██║██║   ██║██╔══██╗██╔══╝  ╚════██║██╔══██║",
    delay: 40,
    type: "accent",
  },
  {
    text: "  ██████╔╝╚██████╔╝██║  ██║███████╗███████║██║  ██║",
    delay: 40,
    type: "accent",
  },
  {
    text: "  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝",
    delay: 40,
    type: "accent",
  },
  { text: "", delay: 30, type: "blank" },
  {
    text: "  ██╗  ██╗ █████╗ ██████╗ ██╗",
    delay: 40,
    type: "accent",
  },
  {
    text: "  ██║ ██╔╝██╔══██╗██╔══██╗██║",
    delay: 40,
    type: "accent",
  },
  {
    text: "  █████╔╝ ███████║██║  ██║██║",
    delay: 40,
    type: "accent",
  },
  {
    text: "  ██╔═██╗ ██╔══██║██║  ██║██║",
    delay: 40,
    type: "accent",
  },
  {
    text: "  ██║  ██╗██║  ██║██████╔╝██║",
    delay: 40,
    type: "accent",
  },
  {
    text: "  ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝",
    delay: 40,
    type: "accent",
  },
  { text: "", delay: 150, type: "blank" },
  {
    text: "  Name:        Duresa Kadi",
    delay: 60,
    type: "info",
  },
  {
    text: `  Certification: ${certifications[0]}`,
    delay: 60,
    type: "info",
  },
  {
    text: `  Certification: ${certifications[1]}`,
    delay: 60,
    type: "info",
  },
  {
    text: "  Location:    Silver Spring, MD",
    delay: 60,
    type: "info",
  },
  {
    text: "  Status:      OPERATIONAL",
    delay: 60,
    type: "ok",
  },
  { text: "", delay: 250, type: "blank" },
  {
    text: "duresa@kadi:~$ startx --desktop",
    delay: 600,
    type: "accent",
  },
  {
    text: "Starting AlphaSec Desktop v3.1...",
    delay: 400,
    type: "info",
  },
];
