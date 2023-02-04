import type { Job } from './job';
import type { Organization } from './organization';
import type { Project } from './project';
import type { Repository } from './repository';

export interface OrgListing {
  details: Organization;
  jobs: Job[];
  projects: Project[];
  repos: Repository[];
  created: string;
}
