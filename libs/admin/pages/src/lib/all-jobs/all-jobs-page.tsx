import dynamic from 'next/dynamic';
import Head from 'next/head';

import { useAllJobsQuery } from '@jobstash/profile/state';

import { AdminLayout, AllJobsTable } from '@jobstash/admin/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const AllJobsPage = () => {
  const { data, isLoading } = useAllJobsQuery();

  const allJobs = data ?? [];

  return (
    <>
      <Head>
        <title>Godmode | All Jobs</title>
      </Head>

      <AdminLayout
        hideHeader
        breadCrumbs={null}
        sidebar={<SideBar />}
        tabsSection={null}
      >
        {isLoading ? (
          <p className="pt-6">Fetching Data ...</p>
        ) : (
          <div className="flex flex-col w-full gap-12">
            <AllJobsTable allJobs={allJobs} />
          </div>
        )}
      </AdminLayout>
    </>
  );
};
