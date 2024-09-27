import dynamic from 'next/dynamic';
import Head from 'next/head';

import { NotFoundPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { OrgProfileInfoProvider } from '@jobstash/profile/state';

import { PageWrapper } from '@jobstash/shared/ui';

import { ActiveATS } from './active-ats';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const ATSSettingsPage = () => {
  const { role, flow } = useAuthContext();

  if (
    role !== CHECK_WALLET_ROLES.ORG ||
    flow !== CHECK_WALLET_FLOWS.ORG_COMPLETE
  )
    return <NotFoundPage />;

  return (
    <>
      <Head>
        <title>ATS Settings</title>
      </Head>
      <OrgProfileInfoProvider>
        <PageWrapper>
          <SideBar />

          <div className="flex flex-col gap-16 p-12">
            <ActiveATS />
          </div>
        </PageWrapper>
      </OrgProfileInfoProvider>
    </>
  );
};
