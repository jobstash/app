import { KIND_LISTING_PROJECT } from '~/core/constants';

import type { Job } from './job';
import type { Listing } from './listing';
import type { Organization } from './organization';
import type { Project } from './project';
import type { Repository } from './repository';

export interface ProjectListing extends Listing {
  kind: typeof KIND_LISTING_PROJECT;
  details: Project;
  org: Organization;
  jobs: Job[];
  projects: null;
  repos: Repository[];
  competitors: Project[];
}

//
// export interface ProjectListing {
//   kind: typeof KIND_LISTING_PROJECT;
//   details: Project;
//   org: Organization;
//   jobs: Job[];
//   repos: Repository[];
//   competitors: Project[];
//   created: string;
// }
