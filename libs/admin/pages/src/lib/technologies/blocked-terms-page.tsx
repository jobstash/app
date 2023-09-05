import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import {
  BlockedTermsMutationProvider,
  useIsLoadingBlockedTermsPage,
} from '@jobstash/admin/state';

import {
  AdminContentLoader,
  AdminLayout,
  AdminTabs,
  BlockedTermsActions,
  BlockedTermsContentWrapper,
} from '@jobstash/admin/ui';
import { BlockedTermsInput } from '@jobstash/admin/ui';
import { BlockedTermsList } from '@jobstash/admin/ui';
import { BreadCrumbs } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const BlockedTermsPage = () => {
  const isLoading = useIsLoadingBlockedTermsPage();

  return (
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
        {isLoading ? (
          <AdminContentLoader />
        ) : (
          <BlockedTermsMutationProvider>
            <BlockedTermsContentWrapper>
              <BlockedTermsInput />
              <BlockedTermsList />
              <BlockedTermsActions />
            </BlockedTermsContentWrapper>
          </BlockedTermsMutationProvider>
        )}
      </AdminLayout>
    </>
  );
};
