"use client";

import { useState } from "react";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FirewallRule {
  num: number;
  chain: string;
  target: string;
  prot: string;
  source: string;
  destination: string;
  extra: string;
  comment: string;
}

const rules: FirewallRule[] = [
  {
    num: 1,
    chain: "INPUT",
    target: "ACCEPT",
    prot: "tcp",
    source: "0.0.0.0/0",
    destination: "0.0.0.0/0",
    extra: "tcp dpt:443 state NEW",
    comment: "always learning - port open for knowledge",
  },
  {
    num: 2,
    chain: "INPUT",
    target: "ACCEPT",
    prot: "all",
    source: "10.0.0.0/8",
    destination: "0.0.0.0/0",
    extra: "state ESTABLISHED,RELATED",
    comment: "trust is earned, then maintained",
  },
  {
    num: 3,
    chain: "FORWARD",
    target: "LOG",
    prot: "all",
    source: "0.0.0.0/0",
    destination: "homelab/24",
    extra: '--log-prefix "[OBSERVE] "',
    comment: "observe everything, assume nothing",
  },
  {
    num: 4,
    chain: "OUTPUT",
    target: "ACCEPT",
    prot: "tcp",
    source: "0.0.0.0/0",
    destination: "0.0.0.0/0",
    extra: "-m owner --uid-owner duresa",
    comment: "ship with confidence and ownership",
  },
  {
    num: 5,
    chain: "INPUT",
    target: "ACCEPT",
    prot: "tcp",
    source: "team/16",
    destination: "0.0.0.0/0",
    extra: "tcp dpt:22 state NEW",
    comment: "collaborate openly - SSH to anyone who shows up",
  },
  {
    num: 6,
    chain: "FORWARD",
    target: "ACCEPT",
    prot: "all",
    source: "problem/32",
    destination: "solution/32",
    extra: "state NEW",
    comment: "route problems directly to solutions",
  },
  {
    num: 7,
    chain: "INPUT",
    target: "DROP",
    prot: "all",
    source: "0.0.0.0/0",
    destination: "0.0.0.0/0",
    extra: "",
    comment: "default deny - prove your intent first",
  },
];

const ruleVariant = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function IptablesRuleset() {
  const [hoveredRule, setHoveredRule] = useState<number | null>(null);

  return (
    <TerminalPanel
      title="iptables -L -n --line-numbers"
      subtitle="operator policy table"
      status="enforced"
      bodyClassName="p-5 md:p-6"
    >
      {/* Chain headers */}
      {["INPUT", "FORWARD", "OUTPUT"].map((chain) => {
        const chainRules = rules.filter((r) => r.chain === chain);
        if (chainRules.length === 0) return null;

        return (
          <div key={chain} className="mb-5 last:mb-0">
            <p className="mb-2 font-mono text-[11px] text-accent/70">
              Chain {chain} (policy {chain === "INPUT" ? "DROP" : "ACCEPT"} 0 packets, 0 bytes)
            </p>
            <p className="mb-1 font-mono text-[10px] text-muted/35">
              num{"  "}target{"     "}prot{"  "}source{"           "}destination
            </p>

            <div className="space-y-0.5">
              {chainRules.map((rule) => (
                <motion.div
                  key={`${rule.chain}-${rule.num}`}
                  custom={rule.num - 1}
                  variants={ruleVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={cn(
                    "group -mx-2 cursor-default px-2 py-1 font-mono text-[11px] transition-colors",
                    "hover:bg-accent-dim/10",
                    rule.target === "DROP" && "text-red-400/80"
                  )}
                  onMouseEnter={() => setHoveredRule(rule.num)}
                  onMouseLeave={() => setHoveredRule(null)}
                >
                  <span className="text-muted/40">{String(rule.num).padEnd(4)}</span>
                  <span
                    className={cn(
                      "font-medium",
                      rule.target === "ACCEPT"
                        ? "text-accent"
                        : rule.target === "LOG"
                          ? "text-warning"
                          : "text-red-400"
                    )}
                  >
                    {rule.target.padEnd(11)}
                  </span>
                  <span className="text-muted/50">{rule.prot.padEnd(6)}</span>
                  <span className="text-foreground/60">{rule.source.padEnd(17)}</span>
                  <span className="text-foreground/60">{rule.destination}</span>

                  {rule.extra && (
                    <span className="text-muted/40 hidden sm:inline">{"  "}{rule.extra}</span>
                  )}

                  {/* Comment */}
                  <span
                    className={cn(
                      "ml-2 transition-colors",
                      hoveredRule === rule.num
                        ? "text-accent"
                        : "text-muted/30"
                    )}
                  >
                    {"/* "}{rule.comment}{" */"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </TerminalPanel>
  );
}
