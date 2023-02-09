import { KIND_LISTING_JOB } from '~/core/constants';

import type { Listing } from '../listing/listing';
import type { Organization } from '../org/organization';
import type { Project } from '../project/project';
import type { Repository } from '../repo/repository';

import type { Job } from './job';

export interface JobListing extends Listing {
  kind: typeof KIND_LISTING_JOB;
  details: Job;
  org: Organization;
  jobs: null;
  projects: Project[];
  repos: Repository[];
  competitors: Project[];
}
