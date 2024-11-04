import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { usePrivy } from '@privy-io/react-auth';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';

import { PageWrapper } from '@jobstash/shared/ui';

import { ApproveOrgModal } from './approve-org-modal';
import { OrgApprovalTable } from './table';
import { OrgApprovalTabs } from './tabs';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const OrgApprovalPage = () => {
  const { ready } = usePrivy();
  const { isLoading } = useAuthContext();

  const hasPermission = useHasPermission(PERMISSIONS.SUPER_ADMIN);

  if (isLoading || !ready) return <LoadingPage />;
  if (!hasPermission) return <NotFoundPage />;

  return (
    <>
      <Head>
        <title>Godmode | Org Approvals</title>
      </Head>

      <PageWrapper>
        <SideBar />
        <div className="pt-20 xl:pt-2 p-4 md:p-8 space-y-8 h-screen text-white min-h-screen">
          <OrgApprovalTabs />
          <OrgApprovalTable />
          <ApproveOrgModal />
        </div>
      </PageWrapper>
    </>
  );
};
