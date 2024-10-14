import dynamic from 'next/dynamic';
import Head from 'next/head';

import { useAtomValue } from 'jotai';

import { type OrgDetails } from '@jobstash/organizations/core';
import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { activeOrgIdAtom } from '@jobstash/organizations/state';
import { isOpenTopBannerAtom } from '@jobstash/shared/state';
import { useIsDesktop } from '@jobstash/shared/state';

import { PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const OrgList = dynamic(() =>
  import('@jobstash/organizations/feature').then((m) => m.OrgList),
);

const OrgsRightPanel = dynamic(() =>
  import('@jobstash/organizations/feature').then((m) => m.OrgsRightPanel),
);

interface Props {
  initActiveOrg: OrgDetails | null;
}

export const OrgListPage = ({ initActiveOrg }: Props) => {
  const activeOrgId = useAtomValue(activeOrgIdAtom);
  const isDesktop = useIsDesktop();
  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <>
      <Head>
        <title>Crypto Organizations</title>
      </Head>

      <PageWrapper>
        <SideBar filtersRouteSection={ROUTE_SECTION.ORGANIZATIONS} />

        <div
          className={cn('px-3.5 pt-[212px] lg:px-8 lg:pt-8 lg:pr-[calc(44vw)]')}
        >
          {/* <div
            className={cn({
              'lg:pr-[calc(44vw)]  ': showFilters,
            })}
          > */}
          <OrgList initOrg={null} activeOrgId={activeOrgId} />
          {/* </div> */}
        </div>

        {activeOrgId && isDesktop && (
          <div
            className={cn(
              'hide-scrollbar fixed inset-0 h-dvh overflow-y-auto bg-dark px-4 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:pr-10 lg:mt-[100px] lg:h-[calc(100vh-100px)]',
              { 'lg:mt-[140px] lg:h-[calc(100vh-140px)]': isOpenTopBanner },
            )}
          >
            <OrgsRightPanel
              orgId={initActiveOrg?.orgId ?? activeOrgId}
              currentTab={TAB_SEGMENT.details}
            />
          </div>
        )}
      </PageWrapper>
    </>
  );
};
