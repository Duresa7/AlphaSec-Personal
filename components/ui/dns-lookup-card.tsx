"use client";

import { useState } from "react";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DnsRecord {
  name: string;
  ttl: number;
  class: string;
  type: string;
  value: string;
  href?: string;
}

const records: DnsRecord[] = [
  {
    name: "duresa.dev.",
    ttl: 86400,
    class: "IN",
    type: "A",
    value: "10.10.0.1",
  },
  {
    name: "duresa.dev.",
    ttl: 86400,
    class: "IN",
    type: "MX",
    value: "10 mail.duresa.dev.  ; duresakadi@gmail.com",
    href: "mailto:duresakadi@gmail.com",
  },
  {
    name: "github.duresa.dev.",
    ttl: 3600,
    class: "IN",
    type: "CNAME",
    value: "github.com/Duresa7.",
    href: "https://github.com/Duresa7",
  },
  {
    name: "linkedin.duresa.dev.",
    ttl: 3600,
    class: "IN",
    type: "CNAME",
    value: "linkedin.com/in/duresa-k.",
    href: "https://www.linkedin.com/in/duresa-k-630039329/",
  },
  {
    name: "duresa.dev.",
    ttl: 86400,
    class: "IN",
    type: "TXT",
    value: '"v=spf1 include:_spf.google.com ~all"',
  },
  {
    name: "_security.duresa.dev.",
    ttl: 86400,
    class: "IN",
    type: "TXT",
    value: '"security+=verified; aws-ccp=verified; comptia-sec+=verified"',
  },
];

const typeColors: Record<string, string> = {
  A: "text-accent",
  MX: "text-warning",
  CNAME: "text-sky-400",
  TXT: "text-purple-400",
};

const recordVariant = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 0.3 + i * 0.08, duration: 0.3 },
  }),
};

export function DnsLookupCard() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <TerminalPanel
      title="dig duresa.dev ANY +noall +answer"
      subtitle="dns zone query"
      status="resolved"
      bodyClassName="p-5 md:p-6"
    >
      {/* dig header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="mb-3 space-y-1 font-mono text-[11px] text-muted/40"
      >
        <p>;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 48291</p>
        <p>;; flags: qr rd ra; QUERY: 1, ANSWER: {records.length}, AUTHORITY: 0, ADDITIONAL: 1</p>
        <p className="mt-2 text-muted/50">;; ANSWER SECTION:</p>
      </motion.div>

      {/* Records */}
      <div className="space-y-0.5">
        {records.map((record, i) => {
          const isClickable = !!record.href;
          const Tag = isClickable ? "a" : "div";
          const linkProps = isClickable
            ? {
                href: record.href,
                target: record.href?.startsWith("mailto:") ? undefined : "_blank" as const,
                rel: record.href?.startsWith("mailto:") ? undefined : "noopener noreferrer",
              }
            : {};

          return (
            <motion.div
              key={i}
              custom={i}
              variants={recordVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Tag
                {...linkProps}
                className={cn(
                  "block py-1.5 px-2 font-mono text-[11px] transition-all -mx-2",
                  isClickable && "cursor-pointer hover:bg-accent-dim/15",
                  hoveredIdx === i && "bg-accent-dim/10"
                )}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className="text-foreground/70">{record.name.padEnd(24)}</span>
                <span className="text-muted/40 tabular-nums">{String(record.ttl).padEnd(8)}</span>
                <span className="text-muted/50">{record.class}{"  "}</span>
                <span className={cn("font-medium", typeColors[record.type] || "text-foreground")}>
                  {record.type.padEnd(7)}
                </span>
                <span className={cn(
                  "text-muted/60",
                  hoveredIdx === i && isClickable && "text-accent"
                )}>
                  {record.value}
                </span>
              </Tag>
            </motion.div>
          );
        })}
      </div>

      {/* dig footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.4 }}
        className="mt-4 space-y-0.5 border-t border-line/50 pt-3 font-mono text-[11px] text-muted/35"
      >
        <p>;; Query time: 2 msec</p>
        <p>;; SERVER: 1.1.1.1#53(1.1.1.1) (UDP)</p>
        <p>;; WHEN: {new Date().toUTCString()}</p>
        <p>;; MSG SIZE  rcvd: 284</p>
      </motion.div>
    </TerminalPanel>
  );
}
