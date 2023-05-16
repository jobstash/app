import type {
  Category,
  FundingRound,
  Investor,
  JobPost,
  Organization,
  Project,
  Technology,
} from '~/shared/core/interfaces';

export interface Job {
  organization: Organization;
  project: Project | null;
  jobpost: JobPost;
  technologies: Technology[];
  categories: Category[];
  fundingRounds: FundingRound[];
  investors: Investor[];
}

export interface JobListQueryPage {
  page: number;
  count: number;
  total: number;
  data: Job[];
}
