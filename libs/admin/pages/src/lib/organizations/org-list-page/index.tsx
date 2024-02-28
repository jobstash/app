import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { useAllOrgs } from '@jobstash/admin/state';

import { AdminLayout } from '@jobstash/admin/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { EditAliasModal } from './edit-alias-modal';
import { OrgListTable } from './table';

export const OrgListPage = () => {
  const { data, isLoading } = useAllOrgs();

  if (isLoading) return <LoadingPage />;

  return (
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
        <OrgListTable data={data ?? []} />
        <EditAliasModal />
      </AdminLayout>
    </>
  );
};
