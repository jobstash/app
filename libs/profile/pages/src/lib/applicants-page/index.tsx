import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-grid-custom.css';

import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { ATS_PROVIDERS } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import { useJobApplicants } from '@jobstash/jobs/state';
import { OrgProfileInfoProvider, useATSClient } from '@jobstash/profile/state';

import { NoteUpdatePayloadSyncer } from '@jobstash/profile/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { activeListAtom } from './active-list-atom';
import { ApplicantsTable } from './table';
import { ApplicantTabs } from './tabs';

export const ApplicantsPage = () => {
  const { role, flow, isLoading: isLoadingAuth } = useAuthContext();
  const { data: atsClient } = useATSClient();

  const activeList = useAtomValue(activeListAtom);
  const { data: rowData, isFetching } = useJobApplicants(
    atsClient?.orgId,
    activeList,
  );

  const isLoading = isLoadingAuth || !atsClient;

  if (isLoading) return <LoadingPage />;
  if (!atsClient.orgId) return <LoadingPage />;

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
      </OrgProfileInfoProvider>
    </>
  );
};
