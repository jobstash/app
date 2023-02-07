import { KIND_LISTING_REPO } from '~/core/constants';

import type { Job } from '../job/job';
import type { Listing } from '../listing/listing';
import type { Organization } from '../org/organization';
import type { Project } from '../project/project';
import type { Repository } from '../repo/repository';

export interface RepoListing extends Listing {
  kind: typeof KIND_LISTING_REPO;
  details: Repository;
  org: Organization;
  jobs: Job[];
  projects: Project[];
  repos: null;
  competitors: null;
}
