import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';

import { PageWrapper } from '@jobstash/shared/ui';

import { PaywallPage } from '../paywall-page';

import { CandidateReportForm } from './candidate-report-form';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const PAGE_TITLE = 'Candidate Report';

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
  if (!hasSubscription) return <PaywallPage title={PAGE_TITLE} />;

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
      </Head>

      <PageWrapper>
        <SideBar />
        <CandidateReportForm />
      </PageWrapper>
    </>
  );
};
