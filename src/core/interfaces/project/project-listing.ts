import { KIND_LISTING_PROJECT } from '~/core/constants';

import type { Job } from '../job/job';
import type { Listing } from '../listing/listing';
import type { Organization } from '../org/organization';
import type { Repository } from '../repo/repository';

import type { Project } from './project';

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
