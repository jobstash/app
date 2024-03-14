import Head from 'next/head';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { IS_DEBUG } from '@jobstash/shared/core';

import { useAuthContext } from '@jobstash/auth/state';
import { OrgProfileInfoProvider } from '@jobstash/profile/state';

import { NotFoundPage, PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { ApplicantsTable } from './table';

export const ProfileOrgApplicantsPage = () => {
  const { role, flow } = useAuthContext();

  // WIP
  if (!IS_DEBUG) return <NotFoundPage />;

  if (
    role !== CHECK_WALLET_ROLES.ORG ||
    flow !== CHECK_WALLET_FLOWS.ORG_COMPLETE
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
