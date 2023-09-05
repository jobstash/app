import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import { useIsLoadingPairedTermsPage } from '@jobstash/admin/state';

import {
  AdminContentLoader,
  AdminLayout,
  AdminTabs,
  ExistingPairedTerms,
  NewPairedTerms,
} from '@jobstash/admin/ui';
import { BreadCrumbs } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const PairedTermsPage = () => {
  const isLoading = useIsLoadingPairedTermsPage();

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
        {isLoading ? (
          <AdminContentLoader />
        ) : (
          <>
            <NewPairedTerms />
            <ExistingPairedTerms />
          </>
        )}
      </AdminLayout>
    </>
  );
};
