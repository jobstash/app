import type {
  Category,
  Job,
  Organization,
  Project,
  Technology,
} from '~/shared/core/interfaces';

export interface JobPost {
  organization: Organization;
  project?: Project;
  jobpost: Job;
  technologies: Technology[];
  categories: Category[]; // Refinement: unused
}
