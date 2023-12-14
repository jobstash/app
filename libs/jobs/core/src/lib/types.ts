import { Infer } from 'myzod';

import {
  jobBookmarkPayloadSchema,
  jobBookmarksResponseSchema,
  jobListQueryPageSchema,
  jobPostSchema,
} from './schemas';

export type JobPost = Infer<typeof jobPostSchema>;
export type JobListQueryPage = Infer<typeof jobListQueryPageSchema>;
export type JobBookmarkPayload = Infer<typeof jobBookmarkPayloadSchema>;
export type JobBookmarksResponse = Infer<typeof jobBookmarksResponseSchema>;

// Interface ProjectInfo {
//   id: string;
//   name: string;
//   url: string;
//   logo: string | null;
//   category: string | null;
//   isMainnet: boolean;
//   tokenSymbol: string | null;

//   tvl: number | null;
//   monthlyRevenue: number | null;
//   monthlyVolume: number | null;
//   monthlyFees: number | null;
//   monthlyActiveUsers: number | null;

//   chains: Chain[];
//   hacks: Hack[];
//   audits: Audit[];
// }

// interface ProjectListItem extends ProjectInfo {
//   jobCount: number | null;
//   repoCount: number | null;
//   tags: Tag[];
// }

// interface ProjectListQueryPage {
//   page: number;
//   count: number;
//   total: number;
//   data: ProjectListItem[];
// }

// // These project fields are not needed in list
// interface ProjectMoreInfo {
//   description: string;
//   githubOrganization: string | null;
//   twitter: string | null;
//   discord: string | null;
//   telegram: string | null;
//   docs: string | null;
// }

// interface ProjectOrg extends OrgInfo {
//   fundingRounds: FundingRound[];
//   investors: Investor[];
// }

// interface ProjectDetails extends ProjectInfo, ProjectMoreInfo {
//   tags: Tag[];
//   jobs: JobInfo[];
//   organization: ProjectOrg;
// }

// interface JobInfo {
//   id: string;
//   shortUUID: string;
//   title: string;
//   location: string | null;
//   commitment: string | null;
//   jobCreatedTimestamp: number;
//   jobApplyPageUrl: string;
//   minSalaryRange: number | null;
//   maxSalaryRange: number | null;
//   seniority: string | null;
//   role: string | null;
//   benefits: string | null;
//   team: string | null;
//   culture: string | null;
//   offersTokenAllocation: boolean | null;
//   paysInCrpyto: boolean | null;
//   salaryCurrency: string | null;
// }

// interface OrgInfo {
//   id: string;
//   orgId: string;
//   url: string;
//   name: string;
//   location: string;
//   description: string;
//   summary: string;
//   altName: string | null;
//   jobsiteLink: string | null;
//   createdTimestamp: number | null;
//   updatedTimestamp: number | null;
//   github: string | null;
//   twitter: string | null;
//   discord: string | null;
//   docs: string | null;
//   telegram: string | null;
//   headcountEstimate: number | null;
//   logo: string | null;
// }

// interface Chain {
//   id: string;
//   name: string;
// }

// interface Tag {
//   id: string;
//   name: string;
//   normalizedName: string;
// }

// interface FundingRound {
//   id: string;
//   date: number;
//   roundName: string | null;
//   raisedAmount: number | null;
// }

// interface Investor {
//   id: string;
//   name: string;
// }

// interface Hack {
//   id: string;
//   defiId: string;
//   category: string | null;
//   fundsLost: number | null;
//   issueType: string | null;
//   date: number | null;
//   description: string | null;
//   fundsReturned: number | null;
// }

// interface Audit {
//   id: string;
//   defiId: string;
//   name: string | null;
//   auditor: string | null;
//   date: number | null;
//   link: string | null;
//   techIssues: number | null;
// }
