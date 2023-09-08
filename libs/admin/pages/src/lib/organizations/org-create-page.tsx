import Head from 'next/head';

import { ADMIN_BREADCRUMBS } from '@jobstash/admin/core';

import { AdminLayout } from '@jobstash/admin/ui';
import { BreadCrumbs } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const OrgCreatePage = () => (
  <>
    <Head>
      <title>Godmode | Create Organization</title>
    </Head>

    <AdminLayout
      breadCrumbs={<BreadCrumbs breadCrumbs={ADMIN_BREADCRUMBS.ORG_LIST} />}
      sidebar={<SideBar />}
      tabsSection={null}
    >
      <p>TODO: Create Organization Page</p>
    </AdminLayout>
  </>
);
