import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-grid-custom.css';

import Head from 'next/head';

import { AdminLayout } from '@jobstash/admin/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { OrgListFocusSyncer } from './org-list-focus-syncer';
import { OrgListTable } from './org-list-table';
import { OrgListTableWrapper } from './org-list-table-wrapper';
import { OrgUpdatePayloadSyncer } from './org-update-payload-syncer';

export const OrgListPageX = () => (
  <>
    <Head>
      <title>Godmode | Organizations</title>
    </Head>
    <AdminLayout
      hideHeader
      breadCrumbs={null}
      sidebar={<SideBar />}
      tabsSection={null}
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
