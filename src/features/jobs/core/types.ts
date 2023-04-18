import type {
  Category,
  JobPost,
  Organization,
  Project,
  Technology,
} from '~/shared/core/interfaces';

export interface Job {
  organization: Organization;
  project?: Project;
  jobpost: JobPost;
  technologies: Technology[];
  categories: Category[];
}

export interface JobListQueryPage {
  page: number;
  count: number;
  total: number;
  data: Job[];
}
