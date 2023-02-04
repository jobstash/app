import type { Job } from './job';
import type { Organization } from './organization';
import type { Project } from './project';
import type { Repository } from './repository';

export interface ProjectListing {
  details: Project;
  org: Organization;
  jobs: Job[];
  repos: Repository[];
  competitors: Project[];
  created: string;
}
