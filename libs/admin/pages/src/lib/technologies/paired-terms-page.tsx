import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import { PairedTermsProvider } from '@jobstash/admin/state';

import {
  AdminLayout,
  AdminTabs,
  ExistingPairedTerms,
  NewPairedTerms,
  PairedTermsContentWrapper,
} from '@jobstash/admin/ui';
import { BreadCrumbs } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const PairedTermsPage = () => (
  <>
    <Head>
      <title>Godmode | Paired Terms</title>
    </Head>

    <AdminLayout
      breadCrumbs={<BreadCrumbs breadCrumbs={ADMIN_BREADCRUMBS.PAIRED_TERMS} />}
      sidebar={<SideBar />}
      tabsSection={<AdminTabs tabs={ADMIN_TABS.TECHNOLOGIES} />}
    >
      <PairedTermsProvider>
        <PairedTermsContentWrapper>
          <NewPairedTerms />
          <ExistingPairedTerms />
        </PairedTermsContentWrapper>
      </PairedTermsProvider>
    </AdminLayout>
  </>
);
