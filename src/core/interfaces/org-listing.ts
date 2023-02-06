import { KIND_LISTING_ORG } from '~/core/constants';

import type { Job } from './job';
import type { Listing } from './listing';
import type { Organization } from './organization';
import type { Project } from './project';
import type { Repository } from './repository';

export interface OrgListing extends Listing {
  kind: typeof KIND_LISTING_ORG;
  details: Organization;
  org: null;
  jobs: Job[];
  projects: Project[];
  repos: Repository[];
  competitors: null;
}

//
// export interface OrgListing {
//   details: Organization;
//   jobs: Job[];
//   projects: Project[];
//   repos: Repository[];
//   created: string;
// }
