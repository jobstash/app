import { KIND_POST_JOB } from '~/core/constants';

import type { Organization } from '../org/organization';
import type { Post } from '../post/post';
import type { Project } from '../project/project';
import type { Repository } from '../repo/repository';

import type { Job } from './job';

export interface JobPost extends Post {
  kind: typeof KIND_POST_JOB;
  details: Job;
  org: Organization;
  jobs: null;
  projects: Project[];
  repos: Repository[];
  competitors: Project[];
}
