import Head from 'next/head';

import { NotFoundPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { IS_DEBUG } from '@jobstash/shared/core';

import { useAuthContext } from '@jobstash/auth/state';
import { OrgProfileInfoProvider } from '@jobstash/profile/state';

import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { DevTalentsTable } from './table';

export const ProfileOrgTalentsPage = () => {
  const { role, flow } = useAuthContext();

  // WIP
  if (!IS_DEBUG) return <NotFoundPage />;

  if (
    role !== CHECK_WALLET_ROLES.ORG ||
    flow !== CHECK_WALLET_FLOWS.ORG_COMPLETE
  ) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Head>
        <title>Available Talents</title>
      </Head>
      <OrgProfileInfoProvider>
        <PageWrapper>
          <SideBar />

          <DevTalentsTable />
        </PageWrapper>
      </OrgProfileInfoProvider>
    </>
  );
};
