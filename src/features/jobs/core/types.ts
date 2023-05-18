import type {
  JobPost,
  Organization,
  Technology,
} from '~/shared/core/interfaces';

//
// export interface JobListResult {
//   technologies: Technology[];

//   organization: Organization;
//   project: Project | null;
//   jobpost: JobPost;
//   categories: Category[];
//   fundingRounds: FundingRound[];
//   investors: Investor[];
// }

export interface JobListResult extends JobPost {
  // ? Different from actual data vs interface
  organization: Organization; // * -> organization?: Organization | null
  technologies: Technology[]; // * -> technologies: Technology[] | null
}

export interface JobListQueryPage {
  page: number;
  count: number;
  total: number;
  data: JobListResult[];
}
