import { KIND_POST_REPO } from '~/core/constants';

import type { Job } from '../job/job';
import type { Organization } from '../org/organization';
import type { Post } from '../post/post';
import type { Project } from '../project/project';

import type { Repository } from './repository';

export interface RepoPost extends Post {
  kind: typeof KIND_POST_REPO;
  details: Repository;
  org: Organization;
  jobs: Job[];
  projects: Project[];
  repos: null;
  competitors: null;
}
