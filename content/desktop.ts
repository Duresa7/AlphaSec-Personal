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

export const desktopWallpaperSrc = "/wallpaper.png";

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

export type DesktopIconSide = "left" | "right";

export interface DesktopIconConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  windowId?: WindowId;
  externalHref?: string;
  side?: DesktopIconSide;
}

export interface WindowConfig {
  id: WindowId;
  title: string;
  icon: LucideIcon;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  openMaximized?: boolean;
}

export const desktopIcons: DesktopIconConfig[] = [
  { id: "dossier", label: "about-me", icon: User, windowId: "dossier" },
  { id: "comms", label: "testimonials", icon: MessageSquare, windowId: "comms" },
  { id: "ops-log", label: "experience", icon: Briefcase, windowId: "ops-log" },
  { id: "certs", label: "education", icon: GraduationCap, windowId: "certs" },
  { id: "modules", label: "skills", icon: Cpu, windowId: "modules" },
  { id: "builds", label: "projects", icon: FolderGit2, windowId: "builds" },
  {
    id: "case-files",
    label: "work-samples",
    icon: FileText,
    windowId: "case-files",
  },
  { id: "terminal", label: "terminal", icon: Terminal, windowId: "terminal" },
  {
    id: "file-manager",
    label: "files",
    icon: FolderOpen,
    windowId: "file-manager",
  },
  {
    id: "secure-ch",
    label: "contact",
    icon: Mail,
    windowId: "secure-ch",
    side: "right",
  },
  {
    id: "github",
    label: "github",
    icon: Github,
    externalHref: siteProfile.githubUrl,
    side: "right",
  },
  {
    id: "linkedin",
    label: "linkedin",
    icon: Linkedin,
    externalHref: siteProfile.linkedInUrl,
    side: "right",
  },
];

export function shouldOpenWindowMaximized(config: WindowConfig) {
  return config.openMaximized ?? true;
}

export const windowConfigs: Record<WindowId, WindowConfig> = {
  dossier: {
    id: "dossier",
    title: "about-me",
    icon: User,
    defaultSize: { width: 720, height: 560 },
    minSize: { width: 400, height: 300 },
  },
  comms: {
    id: "comms",
    title: "testimonials",
    icon: MessageSquare,
    defaultSize: { width: 680, height: 500 },
    minSize: { width: 380, height: 280 },
  },
  "ops-log": {
    id: "ops-log",
    title: "experience",
    icon: Briefcase,
    defaultSize: { width: 760, height: 580 },
    minSize: { width: 420, height: 320 },
  },
  certs: {
    id: "certs",
    title: "education",
    icon: GraduationCap,
    defaultSize: { width: 720, height: 540 },
    minSize: { width: 400, height: 300 },
  },
  modules: {
    id: "modules",
    title: "skills",
    icon: Cpu,
    defaultSize: { width: 740, height: 560 },
    minSize: { width: 420, height: 320 },
  },
  builds: {
    id: "builds",
    title: "projects",
    icon: FolderGit2,
    defaultSize: { width: 780, height: 600 },
    minSize: { width: 440, height: 340 },
  },
  "case-files": {
    id: "case-files",
    title: "work-samples",
    icon: FileText,
    defaultSize: { width: 780, height: 600 },
    minSize: { width: 440, height: 340 },
  },
  "secure-ch": {
    id: "secure-ch",
    title: "contact",
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
    openMaximized: false,
  },
  "file-manager": {
    id: "file-manager",
    title: "files",
    icon: FolderOpen,
    defaultSize: { width: 600, height: 480 },
    minSize: { width: 340, height: 280 },
    openMaximized: false,
  },
};

export const contextMenuItems = [
  { label: "Open Terminal", windowId: "terminal" as WindowId },
  { label: "Open File Manager", windowId: "file-manager" as WindowId },
  { label: "About System", action: "about" as const },
];
