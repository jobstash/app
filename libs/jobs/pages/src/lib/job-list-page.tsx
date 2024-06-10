import { ROUTE_SECTION } from '@jobstash/shared/core';

import { activeJobAtom, jobCountAtom } from '@jobstash/jobs/state';

import { JobListPageTemplate } from './job-list-page-template';

export const JobListPage = () => (
  <JobListPageTemplate
    title="Crypto Jobs"
    routeSection={ROUTE_SECTION.JOBS}
    jobCountAtom={jobCountAtom}
    activeJobAtom={activeJobAtom}
  />
);
