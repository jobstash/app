import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import {
  useAllTechnologies,
  useDelayedAuthRender,
} from '@jobstash/shared/state';

import { AdminLayout, AdminTabs } from '@jobstash/admin/ui';
import { BreadCrumbs, Loader } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const SynonymsPage = () => {
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  const { data, isLoading, isSuccess, isError } = useAllTechnologies();

  return (
    <>
      <Head>
        <title>Godmode | Synonyms</title>
      </Head>

      <AdminLayout
        breadCrumbs={<BreadCrumbs breadCrumbs={ADMIN_BREADCRUMBS.SYNONYMS} />}
        sidebar={<SideBar />}
        tabsSection={<AdminTabs tabs={ADMIN_TABS.TECHNOLOGIES} />}
      >
        {canRender ? <p>TODO</p> : <Loader />}
      </AdminLayout>
    </>
  );
};
