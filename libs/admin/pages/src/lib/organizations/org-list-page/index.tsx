import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-grid-custom.css';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { PERMISSIONS } from '@jobstash/auth/core';

import { AdminLayout } from '@jobstash/admin/ui';

import { OrgListFocusSyncer } from './org-list-focus-syncer';
import { OrgListTable } from './org-list-table';
import { OrgListTableWrapper } from './org-list-table-wrapper';
import { OrgUpdatePayloadSyncer } from './org-update-payload-syncer';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const OrgListPage = () => (
  <>
    <Head>
      <title>Godmode | Organizations</title>
    </Head>
    <AdminLayout
      hideHeader
      breadCrumbs={null}
      sidebar={<SideBar />}
      tabsSection={null}
      requiredPermissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]}
    >
      <div className="w-full">
        <OrgListTableWrapper>
          <OrgListTable />
        </OrgListTableWrapper>
        <OrgListFocusSyncer />
        <OrgUpdatePayloadSyncer />
      </div>
    </AdminLayout>
  </>
);
