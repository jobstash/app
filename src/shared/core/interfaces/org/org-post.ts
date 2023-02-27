import { KIND_POST_ORG } from '~/shared/core/constants';

import type { Job } from '../job/job';
import type { Post } from '../post/post';
import type { Project } from '../project/project';
import type { Repository } from '../repo/repository';

import type { Organization } from './organization';

export interface OrgPost extends Post {
  kind: typeof KIND_POST_ORG;
  details: Organization;
  org: null;
  jobs: Job[];
  projects: Project[];
  repos: Repository[];
  competitors: null;
}
