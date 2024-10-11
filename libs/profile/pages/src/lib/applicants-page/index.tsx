import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-grid-custom.css';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { PERMISSIONS } from '@jobstash/auth/core';
import { ATS_PROVIDERS } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';
import { useJobApplicants } from '@jobstash/jobs/state';
import { useATSClient } from '@jobstash/profile/state';

import { NoteUpdatePayloadSyncer } from '@jobstash/profile/ui';
import { PageWrapper } from '@jobstash/shared/ui';

import { activeListAtom } from './active-list-atom';
import { ApplicantsTable } from './table';
import { ApplicantTabs } from './tabs';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const ApplicantsPage = () => {
  const { isLoading } = useAuthContext();
  const { data: atsClient } = useATSClient();

  const activeList = useAtomValue(activeListAtom);
  const { data: rowData, isFetching } = useJobApplicants(
    atsClient?.orgId,
    activeList,
  );

  const hasPermission = useHasPermission(PERMISSIONS.ORG_MANAGER);

  if (isLoading) return <LoadingPage />;

  if (
    !hasPermission ||
    (atsClient && atsClient.name !== ATS_PROVIDERS.JOBSTASH.platformName)
  ) {
    return <NotFoundPage />;
  }

  if (!atsClient?.orgId) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Job Applicants</title>
      </Head>
      <PageWrapper>
        <SideBar />

        <ApplicantTabs />

        <div
          className={cn({
            'opacity-50 pointer-events-none': isFetching || !rowData,
          })}
        >
          <ApplicantsTable orgId={atsClient.orgId} rowData={rowData} />
        </div>

        <NoteUpdatePayloadSyncer />
      </PageWrapper>
    </>
  );
};
