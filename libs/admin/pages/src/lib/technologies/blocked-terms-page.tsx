import Head from 'next/head';
import { useEffect } from 'react';

import { ADMIN_BREADCRUMBS, ADMIN_TABS } from '@jobstash/admin/core';

import {
  useBlockedTermsStore,
  useGodmodeBlockedTechnologiesQuery,
  useGodmodeTechnologiesQuery,
} from '@jobstash/admin/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import {
  AdminLayout,
  AdminTabs,
  BlockedTermsActions,
} from '@jobstash/admin/ui';
import { BlockedTermsInput } from '@jobstash/admin/ui';
import { BlockedTermsList } from '@jobstash/admin/ui';
import { BreadCrumbs, Loader } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const BlockedTermsPage = () => {
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  const { initOptions, initBlockedTerms } = useBlockedTermsStore((state) => ({
    initOptions: state.initOptions,
    initBlockedTerms: state.initBlockedTerms,
  }));

  const { data: initOptionsData = [], isLoading: isLoadingAllTechs } =
    useGodmodeTechnologiesQuery();

  const {
    data: initBlockedTermsData = [],
    isLoading: isLoadingInitBlockedTerms,
  } = useGodmodeBlockedTechnologiesQuery();

  //
  useEffect(() => {
    if (initOptionsData.length > 0) {
      initOptions(initOptionsData);
    }

    if (initBlockedTerms.length > 0) {
      initBlockedTerms(initBlockedTermsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initBlockedTermsData, initOptionsData]);

  const isLoading = isLoadingAllTechs || isLoadingInitBlockedTerms;

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
        {canRender || isLoading ? (
          <div className="flex flex-col p-12 pb-8 border border-gray rounded-lg w-1/2 gap-8">
            <BlockedTermsInput />
            <BlockedTermsList />
            <BlockedTermsActions />
          </div>
        ) : (
          <Loader />
        )}
      </AdminLayout>
    </>
  );
};
