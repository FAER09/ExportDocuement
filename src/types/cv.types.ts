export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  location?: string;
  summary?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  graduationDate: string;
}

export interface Skill {
  id: string;
  name: string;
  type: "technical" | "soft";
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  template: "modern" | "classic";
}

export interface Profile {
  id: string;
  createdAt: string;
  cvData: CVData;
}
