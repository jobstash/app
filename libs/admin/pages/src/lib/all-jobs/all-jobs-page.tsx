import Head from 'next/head';

import { useAllJobsQuery } from '@jobstash/profile/state';

import { AdminLayout, AllJobsTable } from '@jobstash/admin/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const AllJobsPage = () => {
  const { data, isLoading } = useAllJobsQuery();

  const allJobs = data?.pages.flatMap((d) => d.data) ?? [];

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
          <p>LOADING ...</p>
        ) : (
          <div className="w-full flex flex-col gap-12">
            <AllJobsTable allJobs={allJobs} />
          </div>
        )}
      </AdminLayout>
    </>
  );
};
