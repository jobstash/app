import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import { useDelayedAuthRender } from '@jobstash/shared/state';

import { AdminLayout, AdminTabs } from '@jobstash/admin/ui';
import { BreadCrumbs, Loader } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const TagApprovalsPage = () => {
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  return (
    <>
      <Head>
        <title>Godmode | Tag Approvals</title>
      </Head>

      <AdminLayout
        breadCrumbs={
          <BreadCrumbs breadCrumbs={ADMIN_BREADCRUMBS.TECHNOLOGY_APPROVALS} />
        }
        sidebar={<SideBar />}
        tabsSection={<AdminTabs tabs={ADMIN_TABS.TECHNOLOGIES} />}
      >
        {canRender ? <p>TODO</p> : <Loader />}
      </AdminLayout>
    </>
  );
};
