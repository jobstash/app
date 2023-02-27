import { Job, Organization, Project } from '~/shared/core/interfaces';

export interface JobPost {
  organization: Organization;
  project?: Project;
  jobpost: Job;
  technologies: string[];
  categories: string[]; // Refinement: unused
}
