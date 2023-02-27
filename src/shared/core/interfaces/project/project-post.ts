import { KIND_POST_PROJECT } from '~/shared/core/constants';

import type { Job } from '../job/job';
import type { Organization } from '../org/organization';
import type { Post } from '../post/post';
import type { Repository } from '../repo/repository';

import type { Project } from './project';

export interface ProjectPost extends Post {
  kind: typeof KIND_POST_PROJECT;
  details: Project;
  org: Organization;
  jobs: Job[];
  projects: null;
  repos: Repository[];
  competitors: Project[];
}
