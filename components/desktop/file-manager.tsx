"use client";

import {
  FolderOpen,
  Folder,
  FileText,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDesktop } from "./desktop-context";
import { windowConfigs, type WindowId } from "@/content/desktop";

interface FolderEntry {
  name: string;
  windowId: WindowId;
  files?: string[];
}

const folders: FolderEntry[] = [
  {
    name: "dossier",
    windowId: "dossier",
    files: ["about.md", "profile.json"],
  },
  {
    name: "comms",
    windowId: "comms",
    files: ["trusted-channels.log"],
  },
  {
    name: "ops-log",
    windowId: "ops-log",
    files: ["timeline.json", "systemctl.log"],
  },
  {
    name: "certs",
    windowId: "certs",
    files: ["degrees.pem", "certifications.crt"],
  },
  {
    name: "modules",
    windowId: "modules",
    files: ["skills.yml", "nmap-scan.xml"],
  },
  {
    name: "builds",
    windowId: "builds",
    files: ["docker-compose.yml", "homelab.tf"],
  },
  {
    name: "case-files",
    windowId: "case-files",
    files: ["alphasecunited.md", "valobrain.md", "alphabiz.md"],
  },
  {
    name: "secure-ch",
    windowId: "secure-ch",
    files: ["contacts.gpg", "dns-lookup.sh"],
  },
];

export function FileManager() {
  const { openWindow, state } = useDesktop();

  return (
    <div className="h-full bg-background p-2">
      {/* Path bar */}
      <div className="mb-2 flex items-center gap-1.5 rounded border border-line/60 bg-surface/80 px-3 py-1.5">
        <FolderOpen className="h-3 w-3 text-accent" />
        <span className="ui-mono-meta text-muted/70">~/</span>
      </div>

      {/* File tree */}
      <div className="space-y-0.5">
        {folders.map((folder) => {
          const isOpen = state.windows[folder.windowId]?.isOpen;
          const config = windowConfigs[folder.windowId];
          const Icon = config.icon;

          return (
            <div key={folder.windowId}>
              <button
                onClick={() => openWindow(folder.windowId)}
                className={cn(
                  "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors",
                  "hover:bg-accent-dim/30",
                  isOpen && "bg-accent-dim/20"
                )}
              >
                <ChevronRight
                  className={cn(
                    "h-3 w-3 text-muted/50 transition-transform",
                    isOpen && "rotate-90"
                  )}
                />
                <Folder
                  className={cn(
                    "h-3.5 w-3.5",
                    isOpen ? "text-accent" : "text-muted"
                  )}
                />
                <span
                  className={cn(
                    "ui-mono-meta",
                    isOpen ? "text-accent" : "text-foreground/80"
                  )}
                >
                  {folder.name}/
                </span>
                <Icon className="ml-auto h-3 w-3 text-muted/40" />
              </button>

              {/* Sub-files (decorative) */}
              {isOpen && folder.files && (
                <div className="ml-7 space-y-0.5 py-0.5">
                  {folder.files.map((file) => (
                    <div
                      key={file}
                      className="flex items-center gap-2 px-2 py-0.5"
                    >
                      <FileText className="h-3 w-3 text-muted/40" />
                      <span className="ui-mono-meta text-[12px] text-muted/60">
                        {file}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer stats */}
      <div className="mt-4 border-t border-line/40 pt-2">
        <p className="ui-mono-label text-[9px] text-muted/50">
          {folders.length} directories · {folders.reduce((n, f) => n + (f.files?.length ?? 0), 0)} files
        </p>
      </div>
    </div>
  );
}
