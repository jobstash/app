import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';
import { Tab, Tabs } from '@nextui-org/tabs';

import { useApprovalOrgList } from '@jobstash/admin/state';

import { AdminLayout } from '@jobstash/admin/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { ApprovalTable } from './approval-table';
import { ApproveOrgModal } from './approve-org-modal';

export const OrgApprovalPage = () => {
  const { isLoading: isLoadingPendingOrgs, data: pendingOrgsData } =
    useApprovalOrgList('pending');
  const { isLoading: isLoadingApprovedOrgs, data: approvedOrgsData } =
    useApprovalOrgList('approved');

  if (isLoadingPendingOrgs || isLoadingApprovedOrgs) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Godmode | All Jobs</title>
      </Head>

      <AdminLayout breadCrumbs={null} sidebar={<SideBar />} tabsSection={null}>
        <div className="flex flex-col gap-4 w-full">
          <Tabs
            aria-label="Approval Status"
            color="secondary"
            classNames={{
              cursor: 'bg-gradient-to-l from-primary to-tertiary',
              tabContent: 'font-bold',
            }}
          >
            <Tab key="pending" title="Pending">
              <ApprovalTable showActions data={pendingOrgsData ?? []} />
            </Tab>
            <Tab key="approved" title="Approved">
              <ApprovalTable data={approvedOrgsData ?? []} />
            </Tab>
          </Tabs>
        </div>
        <ApproveOrgModal />
      </AdminLayout>
    </>
  );
};
