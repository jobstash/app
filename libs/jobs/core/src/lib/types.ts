import { Infer } from 'myzod';

import {
  jobDetailsSchema,
  jobListQueryPageSchema,
  jobPostSchema,
} from './schemas';

export type JobDetails = Infer<typeof jobDetailsSchema>;

//
// export interface JobPost {
//   id: string;
//   shortUUID: string;
//   minSalaryRange?: number;
//   maxSalaryRange?: number;
//   medianSalary?: number;
//   seniority?: string;
//   role: null | string;
//   team: null | string;
//   benefits: null | string;
//   culture: null | string;
//   salaryCurrency?: string;
//   paysInCrypto?: boolean;
//   offersTokenAllocation?: boolean;
//   jobApplyPageUrl: string;
//   jobCommitment: null | string;
//   jobCreatedTimestamp: number;
//   jobPageUrl: string;
//   jobLocation: string;
//   jobTitle: string;
//   organization: Organization;
//   technologies: Technology[];
//   jobFoundTimestamp: number;
//   extractedTimestamp: number;
//   aiDetectedTechnologies: string;
// }
export type JobPost = Infer<typeof jobPostSchema>;

//
// export interface JobListQueryPage {
//   page: number;
//   count: number;
//   total: number;
//   data: JobPost[];
// }
export type JobListQueryPage = Infer<typeof jobListQueryPageSchema>;
