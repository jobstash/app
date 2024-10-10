import dynamic from 'next/dynamic';
import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import {
  PreferredTermsFormProvider,
  PreferredTermsProvider,
  TagsProvider,
} from '@jobstash/admin/state';

import {
  AdminLayout,
  AdminTabs,
  ExistingPreferredTerms,
  PreferredTermsContentWrapper,
  PreferredTermsForm,
} from '@jobstash/admin/ui';
import { BreadCrumbs } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const SynonymsPage = () => (
  <>
    <Head>
      <title>Godmode | Synonyms</title>
    </Head>

    <AdminLayout
      breadCrumbs={<BreadCrumbs breadCrumbs={ADMIN_BREADCRUMBS.SYNONYMS} />}
      sidebar={<SideBar />}
      tabsSection={<AdminTabs tabs={ADMIN_TABS.TECHNOLOGIES} />}
    >
      <TagsProvider>
        <PreferredTermsProvider>
          <PreferredTermsContentWrapper>
            <PreferredTermsFormProvider
              initPrimaryTerm={null}
              initSynonyms={null}
            >
              <PreferredTermsForm />
            </PreferredTermsFormProvider>
            <ExistingPreferredTerms />
          </PreferredTermsContentWrapper>
        </PreferredTermsProvider>
      </TagsProvider>
    </AdminLayout>
  </>
);
