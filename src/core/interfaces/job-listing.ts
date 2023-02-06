import { KIND_LISTING_JOB } from '~/core/constants';

import type { Job } from './job';
import type { Listing } from './listing';
import type { Organization } from './organization';
import type { Project } from './project';
import type { Repository } from './repository';

export interface JobListing extends Listing {
  kind: typeof KIND_LISTING_JOB;
  details: Job;
  org: Organization;
  jobs: null;
  projects: Project[];
  repos: Repository[];
  competitors: Project[];
}
