import { KIND_LISTING_ORG } from '~/core/constants';

import type { Job } from '../job/job';
import type { Listing } from '../listing/listing';
import type { Project } from '../project/project';
import type { Repository } from '../repo/repository';

import type { Organization } from './organization';

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
