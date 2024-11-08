import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-grid-custom.css';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';
import { useUsersAvailableForWork } from '@jobstash/profile/state';

import { PageWrapper } from '@jobstash/shared/ui';

import { DevTalentsTable } from './table';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const TalentsPage = () => {
  const { isLoading: isLoadingAuth } = useAuthContext();
  const hasPermission = useHasPermission([
    PERMISSIONS.ORG_AFFILIATE,
    PERMISSIONS.ORG_MANAGER,
    PERMISSIONS.ADMIN,
  ]);

  const { data: rowData, isPending } = useUsersAvailableForWork();

  const isLoading = isLoadingAuth || isPending;

  if (isLoading) return <LoadingPage />;
  if (!hasPermission) return <NotFoundPage />;

  return (
    <>
      <Head>
        <title>Available Talents</title>
      </Head>
      <PageWrapper>
        <SideBar />
        <DevTalentsTable rowData={rowData} />
      </PageWrapper>
    </>
  );
};
