import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';

import { PageWrapper } from '@jobstash/shared/ui';

import { CandidateReportForm } from './candidate-report-form';
import { PreCandidateReportPage } from './pre-candidate-report-page';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const CandidateReportPage = () => {
  const { isLoading } = useAuthContext();
  const canViewPage = useHasPermission([
    PERMISSIONS.ORG_AFFILIATE,
    PERMISSIONS.ORG_MANAGER,
    PERMISSIONS.ADMIN,
  ]);

  const hasSubscription = useHasPermission([PERMISSIONS.ORG_VERI_USER]);

  if (isLoading) return <LoadingPage />;
  if (!canViewPage) return <NotFoundPage />;
  if (!hasSubscription) return <PreCandidateReportPage />;

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
