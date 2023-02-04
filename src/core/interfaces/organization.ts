import type { Tag } from './tag';

export interface Organization {
  id: number;
  name: string;
  avatar: string;
  location: string;
  teamSize: number;
  funding: OrgFunding;
  summary: string;
  description: string;
  website: Tag;
  github: Tag;
  twitter: Tag;
  linkedIn: Tag;
  discord: Tag;
}

interface OrgFunding {
  date: string;
  amount: string;
}
