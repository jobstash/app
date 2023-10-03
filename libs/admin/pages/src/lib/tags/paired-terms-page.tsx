import Head from 'next/head';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import {
  PairedTermsFormProvider,
  PairedTermsProvider,
  TagsProvider,
} from '@jobstash/admin/state';

import {
  AdminLayout,
  AdminTabs,
  ExistingPairedTerms,
  PairedTermForm,
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
      <TagsProvider>
        <PairedTermsProvider>
          <PairedTermsContentWrapper>
            <div className="flex flex-col gap-12 w-full">
              {/* <PairedTermForms /> */}
              <PairedTermsFormProvider initOrigin={null} initDestination={[]}>
                <PairedTermForm />
              </PairedTermsFormProvider>
              <ExistingPairedTerms />
            </div>
          </PairedTermsContentWrapper>
        </PairedTermsProvider>
      </TagsProvider>
    </AdminLayout>
  </>
);
