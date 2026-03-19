export interface Education {
  school: string;
  degree: string;
  expected: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
}

export const education: Education[] = [
  {
    school: "University of Maryland Global Campus",
    degree: "B.S. in Cyber Operations",
    expected: "Expected November 2027",
  },
  {
    school: "Montgomery College",
    degree: "A.A.S. in Cybersecurity",
    expected: "June 2025",
    gpa: "3.4 / 4.0",
    honors: ["3× Dean's List"],
    coursework: [
      "Network Security",
      "Cyber Operations",
      "Incident Response",
      "Digital Forensics",
      "Attacker Tools & Techniques",
      "UNIX/Linux System Administration",
      "Introduction to Networking",
      "Wireless Security",
      "Introduction to Cloud Computing",
    ],
  },
];

export const certifications: string[] = [
  "AWS Certified Cloud Practitioner",
  "CompTIA Security+",
];
