import { FundingRound } from './common';
import { Project } from './project';

//
// export interface Organization {
//   id: string;
//   orgId: string;
//   name: string;
//   altName: string;
//   description: string;
//   summary: string;
//   location: string;
//   url: string;
//   teamSize: number | null;
//   jobsiteLink: string;
//   github: string;
//   twitter?: string;
//   telegram?: string;
//   discord?: string;
//   docs?: string;
//   headcount?: string;
// }

export interface Organization {
  // * Declared correctly
  id: string;
  orgId: string;
  name: string;
  description: string;
  summary: string;
  location: string;
  url: string;
  twitter?: string;
  discord?: string;
  telegram?: string;

  // ? Different from actual data vs interface
  teamSize: null | number; // * -> teamSize?: string
  fundingRounds: FundingRound[]; // * -> fundingRounds: FundingRound[] | null
  projects: Project[]; // * -> projects?: ProjectV2[] | null

  // ? Not in interface
  github: string;
  headcount?: string;
  jobsiteLink: string;
  docs?: string;
  altName: string;

  // ? Declared in interface but not in data
  linkedin?: string;
  githubOrganization?: string;
}
