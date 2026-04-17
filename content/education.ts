export interface Education {
  school: string;
  location: string;
  degree: string;
  expected: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
}

export const education: Education[] = [
  {
    school: "University of Maryland Global Campus",
    location: "Adelphi, MD",
    degree: "Bachelor of Science in Cyber Technology",
    expected: "Expected November 2027",
  },
  {
    school: "Montgomery College",
    location: "Rockville, MD",
    degree: "Associate of Applied Science in Cybersecurity",
    expected: "June 2025",
    gpa: "3.3",
    coursework: [
      "Network Security",
      "Incident Response",
      "Digital Forensics",
      "Attacker Tools and Techniques",
      "UNIX/Linux System Administration",
      "Defending the Network",
      "Wireless Security",
      "Microcomputer Essentials",
      "Cloud Computing",
    ],
  },
];

export const certifications: string[] = [
  "CompTIA Security+",
  "AWS Certified Cloud Practitioner",
  "Anthropic AI Fluency",
  "Anthropic: Building with Claude API",
  "Anthropic MCP: Advanced Topics",
];
