import { ROUTE_SECTION } from '@jobstash/shared/core';

import {
  activeCryptoNativeJobAtom,
  cryptoNativeJobCountAtom,
} from '@jobstash/jobs/state';

import { JobListPageTemplate } from './job-list-page-template';

export const CryptoNativeJobListPage = () => (
  <JobListPageTemplate
    title="Crypto Native Jobs"
    routeSection={ROUTE_SECTION.JOBS_FOR_EXPERTS}
    access="protected"
    jobCountAtom={cryptoNativeJobCountAtom}
    activeJobAtom={activeCryptoNativeJobAtom}
  />
);
