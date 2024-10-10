import dynamic from 'next/dynamic';
import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import { useAuthContext } from '@jobstash/auth/state';

import { AdminLayout, AdminTabs } from '@jobstash/admin/ui';
import { BreadCrumbs, Loader } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const TagApprovalsPage = () => {
  const { isAuthenticated } = useAuthContext();

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
        {isAuthenticated ? <p>TODO</p> : <Loader />}
      </AdminLayout>
    </>
  );
};
