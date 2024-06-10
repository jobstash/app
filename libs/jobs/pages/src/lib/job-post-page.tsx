import { JobPost } from '@jobstash/jobs/core';
import { NotFoundInfo } from '@jobstash/shared/core';

import { activeJobAtom, jobCountAtom } from '@jobstash/jobs/state';

import { JobPostPageTemplate } from './job-post-page-template';

interface Props {
  initJob: JobPost;
  fromSSR: boolean;
  notFoundInfo?: NotFoundInfo;
}

export const JobPostPage = (props: Props) => (
  <JobPostPageTemplate
    {...props}
    jobCountAtom={jobCountAtom}
    activeJobAtom={activeJobAtom}
  />
);
