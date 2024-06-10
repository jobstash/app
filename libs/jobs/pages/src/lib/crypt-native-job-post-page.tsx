import { JobPost } from '@jobstash/jobs/core';
import { NotFoundInfo, ROUTE_SECTION } from '@jobstash/shared/core';

import {
  activeCryptoNativeJobAtom,
  cryptoNativeJobCountAtom,
} from '@jobstash/jobs/state';

import { JobPostPageTemplate } from './job-post-page-template';

interface Props {
  initJob: JobPost;
  fromSSR: boolean;
  notFoundInfo?: NotFoundInfo;
}

export const CryptoNativeJobPostPage = (props: Props) => (
  <JobPostPageTemplate
    {...props}
    activeJobAtom={activeCryptoNativeJobAtom}
    jobCountAtom={cryptoNativeJobCountAtom}
    routeSection={ROUTE_SECTION.CRYPTO_NATIVE_JOBS}
    access="protected"
  />
);
