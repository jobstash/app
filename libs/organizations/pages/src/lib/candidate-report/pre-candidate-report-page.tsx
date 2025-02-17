import dynamic from 'next/dynamic';
import Head from 'next/head';

import { PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const PreCandidateReportPage = () => (
  <>
    <Head>
      <title>Candidate Report</title>
    </Head>

    <PageWrapper>
      <SideBar />
      <p>TODO</p>
    </PageWrapper>
  </>
);
