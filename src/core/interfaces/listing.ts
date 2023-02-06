import type { ListingKind } from '~/core/types/listing';

import type { Job } from './job';
import type { Organization } from './organization';
import type { Project } from './project';
import type { Repository } from './repository';

export interface Listing {
  created: string;
  kind: ListingKind;
  details: Job | Organization | Project | Repository;
  org: Organization | null;
  jobs: Job[] | null;
  projects: Project[] | null;
  repos: Repository[] | null;
  competitors: Project[] | null;
}
