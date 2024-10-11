import dynamic from 'next/dynamic';
import Head from 'next/head';

import { NotFoundPage } from '@jobstash/shared/pages';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useHasPermission } from '@jobstash/auth/state';

import { PageWrapper } from '@jobstash/shared/ui';

import { ActiveATS } from './active-ats';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const ATSSettingsPage = () => {
  const hasPermission = useHasPermission(PERMISSIONS.ORG_MANAGER);

  if (!hasPermission) return <NotFoundPage />;

  return (
    <>
      <Head>
        <title>ATS Settings</title>
      </Head>
      <PageWrapper>
        <SideBar />

        <div className="flex flex-col gap-16 p-12">
          <ActiveATS />
        </div>
      </PageWrapper>
    </>
  );
};
