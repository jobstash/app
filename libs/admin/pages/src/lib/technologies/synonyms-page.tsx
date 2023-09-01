import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import { useIsLoadingSynonymsPage } from '@jobstash/admin/state';

import { AdminLayout, AdminTabs, NewPreferredTerms } from '@jobstash/admin/ui';
import { BreadCrumbs, Loader } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const SynonymsPage = () => {
  const isLoading = useIsLoadingSynonymsPage();

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
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-8 w-full justify-center items-center">
            <NewPreferredTerms />
          </div>
        )}
      </AdminLayout>
    </>
  );
};
