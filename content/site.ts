export type SiteIcon = "github" | "linkedin" | "mail" | "map-pin";

export type SectionId =
  | "about"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "contact";

export interface NavItem {
  label: string;
  href: string;
  sectionId?: SectionId;
}

export interface SocialLink {
  key: "github" | "linkedin" | "email" | "location";
  label: string;
  href: string;
  icon: SiteIcon;
}

export interface Testimonial {
  id: number;
  name: string;
  affiliation: string;
  quote: string;
  imageSrc: string;
  thumbnailSrc: string;
}

export const siteProfile = {
  name: "Duresa Kadi",
  emailAddress: "duresakadi@gmail.com",
  emailHref: "mailto:duresakadi@gmail.com",
  githubUrl: "https://github.com/Duresa7",
  linkedInUrl: "https://www.linkedin.com/in/duresa-k-630039329/",
  locationLabel: "Silver Spring, MD",
} as const;

export const projectLinks = {
  alphaSecUnited: "https://www.alphasecunited.com/",
  valoBrain: "https://github.com/ivanepopov/Valobrain/",
} as const;

export const navItems: NavItem[] = [
  { label: "about", href: "/#about", sectionId: "about" },
  { label: "experience", href: "/#experience", sectionId: "experience" },
  { label: "education", href: "/#education", sectionId: "education" },
  { label: "skills", href: "/#skills", sectionId: "skills" },
  { label: "projects", href: "/#projects", sectionId: "projects" },
  { label: "work examples", href: "/work" },
  { label: "contact", href: "/#contact", sectionId: "contact" },
];

export const trackedSectionIds = navItems.flatMap((item) =>
  item.sectionId ? [item.sectionId] : []
);

const githubLink = {
  key: "github",
  label: "GitHub",
  href: siteProfile.githubUrl,
  icon: "github",
} satisfies SocialLink;

const linkedInLink = {
  key: "linkedin",
  label: "LinkedIn",
  href: siteProfile.linkedInUrl,
  icon: "linkedin",
} satisfies SocialLink;

const emailLink = {
  key: "email",
  label: siteProfile.emailAddress,
  href: siteProfile.emailHref,
  icon: "mail",
} satisfies SocialLink;

const locationLink = {
  key: "location",
  label: siteProfile.locationLabel,
  href: "#",
  icon: "map-pin",
} satisfies SocialLink;

export const socialLinks = [
  githubLink,
  linkedInLink,
  emailLink,
  locationLink,
] as const satisfies readonly SocialLink[];

export const primaryContactLinks = [
  emailLink,
  githubLink,
  linkedInLink,
] as const satisfies readonly SocialLink[];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Michael "Mas" Smith',
    affiliation: "Head Coach at FaZe Clan",
    quote:
      "Duresa consistently demonstrated an exceptional ability to deliver results regardless of the challenge in front of him. During his time as my assistant coach, he contributed meaningfully through strategic analysis, problem-solving, and a level of dedication that went well beyond his defined role. What stood out most was his remarkable capacity to absorb and apply new information quickly, adapting to whatever the situation demanded. He is exactly the kind of person you want in your corner.",
    imageSrc: "/mas.png",
    thumbnailSrc: "/mas.png",
  },
  {
    id: 2,
    name: "Katie Harry",
    affiliation: "Director at Converse University",
    quote:
      "In all my years leading this program, it is rare to come across someone with the level of maturity and intentionality that Duresa brought to his work. When he came on board, our teams were in a difficult place, and his presence was instrumental in turning things around. The athletes he coached looked up to him not because they were asked to, but because he earned it through his dedication and genuine ability to connect and inspire. His professionalism and character were a reflection of someone who truly understands what it means to be a leader, and he left a lasting impression on this program and everyone in it.",
    imageSrc: "/katie.jpg",
    thumbnailSrc: "/katie.jpg",
  },
  {
    id: 4,
    name: "Ahmed Haji",
    affiliation: "Waabee Self Help Founder",
    quote:
      "Duresa was the backbone of our technology operations at Waabee Self-Help. As a nonprofit, we relied heavily on him to wear many hats, and he never once fell short. From managing our website and AV setup to establishing our entire business workspace including tools like Slack, he built the infrastructure that allowed our team to function and grow. What stood out most was that he did all of this on his own, with minimal direction and maximum initiative. He brought a level of professionalism and reliability to our organization that we genuinely could not have operated without. Any team would be lucky to have him.",
    imageSrc: "/ahmed.jpg",
    thumbnailSrc: "/ahmed.jpg",
  },
];
