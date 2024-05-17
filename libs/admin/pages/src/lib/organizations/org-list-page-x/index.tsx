import Head from 'next/head';

import { AdminLayout } from '@jobstash/admin/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { OrgListTable } from './org-list-table';
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
      <div className="ag-theme-quartz w-full" style={{ height: 800 }}>
        <OrgListTable />
      </div>
      <OrgUpdatePayloadSyncer />
    </AdminLayout>
  </>
);
