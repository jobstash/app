export interface Organization {
  id: string;
  orgId: string;
  name: string;
  altName?: string;
  description: string;
  summary: string;
  location: string;
  url: string;
  logoUrl?: string;
  githubOrganization?: string;
  headCount?: number;
  twitter?: string;
  discord?: string;
  docs?: string;
  telegram?: string;

  createdTimestamp: number;
  updatedTimestamp?: number;
}
