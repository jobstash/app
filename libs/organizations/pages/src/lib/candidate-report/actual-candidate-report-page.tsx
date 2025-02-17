import dynamic from 'next/dynamic';
import Head from 'next/head';

import { PageWrapper } from '@jobstash/shared/ui';

import { CandidateReportForm } from './candidate-report-form';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const ActualCandidateReportPage = () => (
  <>
    <Head>
      <title>Candidate Report</title>
    </Head>

    <PageWrapper>
      <SideBar />
      <CandidateReportForm />
    </PageWrapper>
  </>
);
