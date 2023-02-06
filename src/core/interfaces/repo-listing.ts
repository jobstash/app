import { KIND_LISTING_REPO } from '~/core/constants';

import type { Job } from './job';
import type { Listing } from './listing';
import type { Organization } from './organization';
import type { Project } from './project';
import type { Repository } from './repository';

export interface RepoListing extends Listing {
  kind: typeof KIND_LISTING_REPO;
  details: Repository;
  org: Organization;
  jobs: Job[];
  projects: Project[];
  repos: null;
  competitors: null;
}

//
// export interface RepoListing {
//   details: Repository;
//   org: Organization;
//   project: Project;
//   jobs: Job[];
//   created: string;
// }
