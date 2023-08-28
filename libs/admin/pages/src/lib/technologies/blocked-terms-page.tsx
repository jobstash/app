import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import { BlockedTermsProvider } from '@jobstash/admin/state';

import {
  AdminLayout,
  AdminTabs,
  BlockedTermsActions,
  BlockedTermsContentWrapper,
} from '@jobstash/admin/ui';
import { BlockedTermsInput } from '@jobstash/admin/ui';
import { BlockedTermsList } from '@jobstash/admin/ui';
import { BreadCrumbs } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const BlockedTermsPage = () => (
  <>
    <Head>
      <title>Godmode | Blocked Terms</title>
    </Head>

    <AdminLayout
      breadCrumbs={
        <BreadCrumbs breadCrumbs={ADMIN_BREADCRUMBS.BLOCKED_TERMS} />
      }
      sidebar={<SideBar />}
      tabsSection={<AdminTabs tabs={ADMIN_TABS.TECHNOLOGIES} />}
    >
      <BlockedTermsProvider>
        <BlockedTermsContentWrapper>
          <BlockedTermsInput />
          <BlockedTermsList />
          <BlockedTermsActions />
        </BlockedTermsContentWrapper>
      </BlockedTermsProvider>
    </AdminLayout>
  </>
);
