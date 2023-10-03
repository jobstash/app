import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import {
  PreferredTermsMutationProvider,
  useIsLoadingSynonymsPage,
} from '@jobstash/admin/state';

import {
  AdminContentLoader,
  AdminLayout,
  AdminTabs,
  ExistingPreferredTerms,
  NewPreferredTerms,
} from '@jobstash/admin/ui';
import { BreadCrumbs } from '@jobstash/shared/ui';
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
          <AdminContentLoader />
        ) : (
          <div className="flex flex-col gap-8 w-full justify-center items-center">
            <PreferredTermsMutationProvider>
              <NewPreferredTerms />
            </PreferredTermsMutationProvider>
            <ExistingPreferredTerms />
          </div>
        )}
      </AdminLayout>
    </>
  );
};
