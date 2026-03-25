import {
  User,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Cpu,
  FolderGit2,
  FileText,
  Mail,
  Terminal,
  Github,
  Linkedin,
  FolderOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteProfile } from "./site";

export type WindowId =
  | "dossier"
  | "comms"
  | "ops-log"
  | "certs"
  | "modules"
  | "builds"
  | "case-files"
  | "secure-ch"
  | "terminal"
  | "file-manager";

export interface DesktopIconConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  windowId?: WindowId;
  externalHref?: string;
}

export interface WindowConfig {
  id: WindowId;
  title: string;
  icon: LucideIcon;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
}

export const desktopIcons: DesktopIconConfig[] = [
  { id: "dossier", label: "dossier", icon: User, windowId: "dossier" },
  { id: "comms", label: "comms", icon: MessageSquare, windowId: "comms" },
  { id: "ops-log", label: "ops-log", icon: Briefcase, windowId: "ops-log" },
  { id: "certs", label: "certs", icon: GraduationCap, windowId: "certs" },
  { id: "modules", label: "modules", icon: Cpu, windowId: "modules" },
  { id: "builds", label: "builds", icon: FolderGit2, windowId: "builds" },
  {
    id: "case-files",
    label: "case-files",
    icon: FileText,
    windowId: "case-files",
  },
  { id: "secure-ch", label: "secure-ch", icon: Mail, windowId: "secure-ch" },
  { id: "terminal", label: "terminal", icon: Terminal, windowId: "terminal" },
  {
    id: "file-manager",
    label: "ranger",
    icon: FolderOpen,
    windowId: "file-manager",
  },
  {
    id: "github",
    label: "github",
    icon: Github,
    externalHref: siteProfile.githubUrl,
  },
  {
    id: "linkedin",
    label: "linkedin",
    icon: Linkedin,
    externalHref: siteProfile.linkedInUrl,
  },
];

export const windowConfigs: Record<WindowId, WindowConfig> = {
  dossier: {
    id: "dossier",
    title: "operator-dossier.sh",
    icon: User,
    defaultSize: { width: 720, height: 560 },
    minSize: { width: 400, height: 300 },
  },
  comms: {
    id: "comms",
    title: "trusted-channels.log",
    icon: MessageSquare,
    defaultSize: { width: 680, height: 500 },
    minSize: { width: 380, height: 280 },
  },
  "ops-log": {
    id: "ops-log",
    title: "systemctl --history",
    icon: Briefcase,
    defaultSize: { width: 760, height: 580 },
    minSize: { width: 420, height: 320 },
  },
  certs: {
    id: "certs",
    title: "credential-store",
    icon: GraduationCap,
    defaultSize: { width: 720, height: 540 },
    minSize: { width: 400, height: 300 },
  },
  modules: {
    id: "modules",
    title: "nmap --inventory",
    icon: Cpu,
    defaultSize: { width: 740, height: 560 },
    minSize: { width: 420, height: 320 },
  },
  builds: {
    id: "builds",
    title: "docker-compose.yml",
    icon: FolderGit2,
    defaultSize: { width: 780, height: 600 },
    minSize: { width: 440, height: 340 },
  },
  "case-files": {
    id: "case-files",
    title: "case-files/",
    icon: FileText,
    defaultSize: { width: 780, height: 600 },
    minSize: { width: 440, height: 340 },
  },
  "secure-ch": {
    id: "secure-ch",
    title: "netcat --connect",
    icon: Mail,
    defaultSize: { width: 680, height: 500 },
    minSize: { width: 380, height: 280 },
  },
  terminal: {
    id: "terminal",
    title: "bash",
    icon: Terminal,
    defaultSize: { width: 700, height: 460 },
    minSize: { width: 380, height: 260 },
  },
  "file-manager": {
    id: "file-manager",
    title: "ranger",
    icon: FolderOpen,
    defaultSize: { width: 600, height: 480 },
    minSize: { width: 340, height: 280 },
  },
};

export const contextMenuItems = [
  { label: "Open Terminal", windowId: "terminal" as WindowId },
  { label: "Open File Manager", windowId: "file-manager" as WindowId },
  { label: "Toggle Theme", action: "toggle-theme" as const },
  { label: "About System", action: "about" as const },
];
