import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { NotFoundPage } from '@jobstash/shared/pages';
import { useAtom, useAtomValue } from 'jotai';
import { isOpenTopBannerAtom } from '@jobstash/shared/state';

import { type OrgDetails, OrgListItem } from '@jobstash/organizations/core';
import {
  ERR_INTERNAL,
  type NotFoundInfo,
  ROUTE_SECTION,
} from '@jobstash/shared/core';
import { cn, sentryMessage } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeOrgIdAtom } from '@jobstash/organizations/state';
import { useMobileDisableScrollSyncer } from '@jobstash/shared/state';

import { getFundingRoundsData, PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const OrgList = dynamic(() =>
  import('@jobstash/organizations/feature').then((m) => m.OrgList),
);

const OrgsRightPanel = dynamic(() =>
  import('@jobstash/organizations/feature').then((m) => m.OrgsRightPanel),
);

export interface OrgDetailsPageProps {
  fromSSR: boolean;
  initOrgDetails: OrgDetails | null;
  notFoundInfo?: NotFoundInfo;
}

export const OrgDetailsPage = ({
  fromSSR,
  initOrgDetails,
  notFoundInfo,
}: OrgDetailsPageProps) => {
  const [activeOrgId, setActiveOrgId] = useAtom(activeOrgIdAtom);

  useEffect(() => {
    if (initOrgDetails && !activeOrgId) {
      setActiveOrgId(initOrgDetails.orgId);
    }
  }, [activeOrgId, initOrgDetails, setActiveOrgId]);

  // Prevent scroll restore when directly accessed from address-bar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = fromSSR ? 'manual' : 'auto';
    }
  }, [fromSSR]);
  useMobileDisableScrollSyncer({ shouldDisable: true });

  const { query } = useRouter();
  const { slug, tab } = query;
  if (!slug || !tab) {
    sentryMessage(
      'OrgDetailsPage: missing router.query definitions',
      `slug = "${slug}", tab = "${tab}"`,
    );

    throw new Error(ERR_INTERNAL);
  }

  // Get orgId from url or initOrgDetails
  const orgId = useMemo(() => {
    if (initOrgDetails) {
      return initOrgDetails.orgId;
    }

    return (slug as string).split('-').at(-1) ?? null;
  }, [initOrgDetails, slug]);

  const showFilters = useAtomValue(showFiltersAtom);

  if (notFoundInfo) {
    return <NotFoundPage notFoundInfo={notFoundInfo} />;
  }

  const { lastFundingAmount, lastFundingDate } = getFundingRoundsData(
    initOrgDetails?.fundingRounds ?? [],
  );

  const initOrgListItem: OrgListItem | null = initOrgDetails
    ? {
        ...initOrgDetails,
        url: initOrgDetails.website,
        jobCount: initOrgDetails.jobs.length,
        projectCount: initOrgDetails.projects.length,
        lastFundingAmount,
        lastFundingDate,
      }
    : null;

  //
  // const urlMetaData = `${FRONTEND_URL}/organizations/${slug}/details`;

  // TODO: image meta data
  // TODO: org meta data
  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);


  return (
    <>
      {/* TODO: metadata */}

      <PageWrapper>
        <SideBar filtersRouteSection={ROUTE_SECTION.ORGANIZATIONS} />

        <div
          className={cn('px-3.5 pt-[212px] lg:px-8 lg:pt-8', {
            'z-50': showFilters,
            'lg:pr-[calc(44vw)]  ': !showFilters,
          })}
        >
          <div
            className={cn({
              'lg:pr-[calc(44vw)]  ': showFilters,
            })}
          >
            <OrgList initOrg={initOrgListItem} activeOrgId={activeOrgId} />
          </div>
        </div>

        <div
          className={cn(
            'hide-scrollbar fixed inset-0 h-dvh overflow-y-auto bg-dark px-4 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:pr-10 lg:mt-[100px] lg:h-[calc(100vh-100px)]',
            { 'z-50': !showFilters },
            { '-z-50': showFilters },
            { 'lg:mt-[140px] lg:h-[calc(100vh-140px)]': isOpenTopBanner }
          )}
        >
          <OrgsRightPanel hasTitle orgId={orgId} currentTab={tab as string} />
        </div>
      </PageWrapper>
    </>
  );
};
