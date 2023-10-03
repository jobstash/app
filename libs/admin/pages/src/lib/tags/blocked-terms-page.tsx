import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import {
  BlockedTermsFormProvider,
  BlockedTermsMutationProvider,
  BlockedTermsProvider,
  TagsProvider,
} from '@jobstash/admin/state';

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
      <TagsProvider>
        <BlockedTermsProvider>
          <BlockedTermsFormProvider>
            <BlockedTermsMutationProvider>
              <BlockedTermsContentWrapper>
                <BlockedTermsInput />
                <BlockedTermsList />
                <BlockedTermsActions />
              </BlockedTermsContentWrapper>
            </BlockedTermsMutationProvider>
          </BlockedTermsFormProvider>
        </BlockedTermsProvider>
      </TagsProvider>
    </AdminLayout>
  </>
);
