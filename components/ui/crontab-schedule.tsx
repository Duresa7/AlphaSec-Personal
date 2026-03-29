"use client";

import { useEffect, useState } from "react";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { siteProfile } from "@/content/site";

interface CronEntry {
  schedule: string;
  command: string;
  comment: string;
  humanReadable: string;
  match: {
    minutes?: number[];
    hours?: number[];
    daysOfMonth?: number[];
    daysOfWeek?: number[]; // 0=Sun, 1=Mon, ... 6=Sat
  };
}

const cronEntries: CronEntry[] = [
  {
    schedule: "0 6 * * 1-5",
    command: "/usr/local/bin/homelab-health-check",
    comment: "morning infrastructure review",
    humanReadable: "Every weekday at 6:00 AM",
    match: {
      minutes: [0],
      hours: [6],
      daysOfWeek: [1, 2, 3, 4, 5],
    },
  },
  {
    schedule: "0 9 * * 1-5",
    command: "/opt/study/umgc-coursework --focus",
    comment: "Bachelor of Science in Cyber Operations study block",
    humanReadable: "Every weekday at 9:00 AM",
    match: {
      minutes: [0],
      hours: [9],
      daysOfWeek: [1, 2, 3, 4, 5],
    },
  },
  {
    schedule: "0 * * * *",
    command: "/usr/local/bin/wazuh-alert-triage",
    comment: "hourly alert review and triage",
    humanReadable: "Every hour, on the hour",
    match: {
      minutes: [0],
    },
  },
  {
    schedule: "0 8 * * 1",
    command: "/usr/local/bin/weekly-vuln-scan --full",
    comment: "monday full vulnerability scan",
    humanReadable: "Every Monday at 8:00 AM",
    match: {
      minutes: [0],
      hours: [8],
      daysOfWeek: [1],
    },
  },
  {
    schedule: "30 14 * * 3",
    command: "/opt/lab/threat-hunt --ioc-refresh",
    comment: "midweek threat hunting session",
    humanReadable: "Every Wednesday at 2:30 PM",
    match: {
      minutes: [30],
      hours: [14],
      daysOfWeek: [3],
    },
  },
  {
    schedule: "0 21 * * *",
    command: "/usr/local/bin/threat-intel-update",
    comment: "nightly threat intel enrichment",
    humanReadable: "Every day at 9:00 PM",
    match: {
      minutes: [0],
      hours: [21],
    },
  },
  {
    schedule: "0 0 1 * *",
    command: "/opt/reports/monthly-security-review",
    comment: "monthly security posture report",
    humanReadable: "1st of every month at midnight",
    match: {
      minutes: [0],
      hours: [0],
      daysOfMonth: [1],
    },
  },
];

function matchesField(values: number[] | undefined, current: number) {
  return values ? values.includes(current) : true;
}

function isCurrentlyActive(entry: CronEntry): boolean {
  const now = new Date();
  return (
    matchesField(entry.match.minutes, now.getMinutes()) &&
    matchesField(entry.match.hours, now.getHours()) &&
    matchesField(entry.match.daysOfMonth, now.getDate()) &&
    matchesField(entry.match.daysOfWeek, now.getDay())
  );
}

const entryVariant = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
};

export function CrontabSchedule() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    let intervalId: number | undefined;
    const tick = () => setTick((value) => value + 1);
    const timeoutId = window.setTimeout(() => {
      tick();
      intervalId = window.setInterval(tick, 60000);
    }, 60000 - (Date.now() % 60000));

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <TerminalPanel
      title="crontab -l -u duresa"
      subtitle="scheduled operations"
      status="loaded"
      bodyClassName="p-5 md:p-6"
    >
      {/* Crontab headers */}
      <div className="mb-4 space-y-0.5 font-mono text-[11px] text-muted/40">
        <p>SHELL=/bin/bash</p>
        <p>PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin</p>
        <p>MAILTO={siteProfile.emailAddress}</p>
      </div>

      {/* Entries */}
      <div className="space-y-0.5">
        {cronEntries.map((entry, i) => {
          const active = isCurrentlyActive(entry);
          return (
            <motion.div
              key={i}
              custom={i}
              variants={entryVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn(
                "group relative -mx-2 cursor-default px-2 py-1.5 font-mono text-[11px] transition-all",
                "hover:bg-accent-dim/10",
                active && "bg-accent-dim/15 border-l-2 border-accent"
              )}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex flex-wrap items-start gap-x-1">
                {/* Active indicator */}
                {active && (
                  <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse bg-accent" />
                )}

                {/* Schedule */}
                <span className={cn(
                  "text-accent/80 min-w-[100px]",
                  active && "text-accent font-medium"
                )}>
                  {entry.schedule}
                </span>

                {/* Command */}
                <span className="text-foreground/70">{entry.command}</span>

                {/* Comment */}
                <span className={cn(
                  "transition-colors",
                  hoveredIdx === i ? "text-accent/60" : "text-muted/30"
                )}>
                  {"# "}{entry.comment}
                </span>
              </div>

              {/* Human-readable tooltip on hover */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  hoveredIdx === i ? "mt-1 max-h-8 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-[10px] text-muted/50 pl-[100px]">
                  {entry.humanReadable}
                  {active && " - running now"}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 border-t border-line/50 pt-3 font-mono text-[11px] text-muted/35">
        <p>{cronEntries.length} entries loaded &middot; next run check in 60s</p>
      </div>
    </TerminalPanel>
  );
}
