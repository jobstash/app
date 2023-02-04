import type { Job } from './job';
import type { Organization } from './organization';
import type { Project } from './project';
import type { Repository } from './repository';

export interface RepoListing {
  details: Repository;
  org: Organization;
  project: Project;
  jobs: Job[];
  created: string;
}
