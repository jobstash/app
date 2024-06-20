import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { ATS_PROVIDERS } from '@jobstash/profile/core';

import { useAuthContext } from '@jobstash/auth/state';
import { OrgProfileInfoProvider, useATSClient } from '@jobstash/profile/state';

import { NotFoundPage, PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { ApplicantsTable } from './table';

export const ProfileOrgApplicantsPage = () => {
  const { role, flow, isLoading: isLoadingAuth } = useAuthContext();
  const { data: atsClient, isPending } = useATSClient();

  const isLoading = isLoadingAuth || isPending;

  if (isLoading) return <LoadingPage />;

  if (
    role !== CHECK_WALLET_ROLES.ORG ||
    flow !== CHECK_WALLET_FLOWS.ORG_COMPLETE ||
    (atsClient && atsClient.name !== ATS_PROVIDERS.JOBSTASH.platformName)
  )
    return <NotFoundPage />;

  return (
    <>
      <Head>
        <title>Job Applicants</title>
      </Head>
      <OrgProfileInfoProvider>
        <PageWrapper>
          <SideBar />

          <ApplicantsTable />
        </PageWrapper>
      </OrgProfileInfoProvider>
    </>
  );
};
