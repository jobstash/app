import type { PostKind } from '~/core/types';

import type { Job } from '../job/job';
import type { Organization } from '../org/organization';
import type { Project } from '../project/project';
import type { Repository } from '../repo/repository';

export interface Post {
  created: string;
  kind: PostKind;
  details: Job | Organization | Project | Repository;
  org: Organization | null;
  jobs: Job[] | null;
  projects: Project[] | null;
  repos: Repository[] | null;
  competitors: Project[] | null;
}
