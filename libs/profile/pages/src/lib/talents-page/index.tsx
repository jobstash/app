import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { OrgProfileInfoProvider, useDevTalents } from '@jobstash/profile/state';

import { NoteUpdatePayloadSyncer } from '@jobstash/profile/ui';
import { PageWrapper } from '@jobstash/shared/ui';

import { DevTalentsTable } from './table';
import { TalentTabs } from './tabs';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const TalentsPage = () => {
  const { role, flow, isLoading: isLoadingAuth } = useAuthContext();

  const { data: rowData, isPending } = useDevTalents();

  const isLoading = isLoadingAuth || isPending;

  if (isLoading) return <LoadingPage />;

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
          <TalentTabs />
          <DevTalentsTable rowData={rowData} />
          <NoteUpdatePayloadSyncer />
        </PageWrapper>
      </OrgProfileInfoProvider>
    </>
  );
};
