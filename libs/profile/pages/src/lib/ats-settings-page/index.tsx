import Head from 'next/head';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { IS_DEBUG } from '@jobstash/shared/core';

import { useAuthContext } from '@jobstash/auth/state';
import { OrgProfileInfoProvider } from '@jobstash/profile/state';

import { NotFoundPage, PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { ActiveATS } from './active-ats';
import { Nfts } from './nfts';
import { OrgHighlights } from './org-highlights';

export const ATSSettingsPage = () => {
  const { role, flow } = useAuthContext();

  if (
    !IS_DEBUG ||
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
            <OrgHighlights />
            <Nfts />
          </div>
        </PageWrapper>
      </OrgProfileInfoProvider>
    </>
  );
};
