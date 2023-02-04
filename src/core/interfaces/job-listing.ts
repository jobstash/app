import type { Job } from './job';
import type { Organization } from './organization';
import type { Project } from './project';
import type { Repository } from './repository';

export interface JobListing {
  details: Job;
  org: Organization;
  project: Project;
  repos: Repository[];
  competitors: Project[];
  created: string;
}
