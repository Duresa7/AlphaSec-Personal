export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "map-pin";
}

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Duresa7",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/duresa-k-630039329/",
    icon: "linkedin",
  },
  {
    label: "duresakadi@gmail.com",
    href: "mailto:duresakadi@gmail.com",
    icon: "mail",
  },

  {
    label: "Silver Spring, MD",
    href: "#",
    icon: "map-pin",
  },
];
