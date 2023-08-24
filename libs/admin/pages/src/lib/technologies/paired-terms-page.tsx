import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import { useDelayedAuthRender } from '@jobstash/shared/state';

import { AdminLayout, AdminTabs } from '@jobstash/admin/ui';
import { BreadCrumbs, Loader } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const PairedTermsPage = () => {
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  return (
    <>
      <Head>
        <title>Godmode | Paired Terms</title>
      </Head>

      <AdminLayout
        breadCrumbs={
          <BreadCrumbs breadCrumbs={ADMIN_BREADCRUMBS.PAIRED_TERMS} />
        }
        sidebar={<SideBar />}
        tabsSection={<AdminTabs tabs={ADMIN_TABS.TECHNOLOGIES} />}
      >
        {canRender ? <p>TODO</p> : <Loader />}
      </AdminLayout>
    </>
  );
};
