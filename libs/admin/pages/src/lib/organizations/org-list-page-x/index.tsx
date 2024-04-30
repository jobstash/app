import Head from 'next/head';

import { AdminLayout } from '@jobstash/admin/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { OrgListTable } from './org-list-table';

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
        <OrgListTable />
      </div>
    </AdminLayout>
  </>
);
