export interface Organization {
  id: string;
  orgId: string;
  name: string;
  altName: string;
  description: string;
  summary: string;
  location: string;
  url: string;
  teamSize: number | null;
  jobsiteLink: string;
  github: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  docs?: string;
  headcount?: string;
}
