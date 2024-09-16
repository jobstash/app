import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';

import { PageWrapper } from '@jobstash/shared/ui';

import { CandidateReportForm } from './candidate-report-form';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const CandidateReportPage = () => {
  const { isLoading, role, flow } = useAuthContext();

  if (isLoading) return <LoadingPage />;

  const isOrg = role === CHECK_WALLET_ROLES.ORG;
  const isComplete = flow === CHECK_WALLET_FLOWS.ORG_COMPLETE;

  if (!isOrg || !isComplete) {
    return <NotFoundPage />;
  }

  return (
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
};
