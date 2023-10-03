import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { type OrgDetails, OrgListItem } from '@jobstash/organizations/core';
import {
  ERR_INTERNAL,
  FRONTEND_URL,
  type NotFoundInfo,
  ROUTE_SECTION,
} from '@jobstash/shared/core';
import { cn, sentryMessage } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeOrgIdAtom } from '@jobstash/organizations/state';

import { getFundingRoundsData, NotFoundPage } from '@jobstash/shared/ui';

const Filters = dynamic(() =>
  import('@jobstash/filters/feature').then((m) => m.Filters),
);

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
        orgId: initOrgDetails.orgId,
        url: initOrgDetails.website,
        name: initOrgDetails.name,
        location: initOrgDetails.location,
        jobCount: initOrgDetails.jobs.length,
        projectCount: initOrgDetails.projects.length,
        headCount: initOrgDetails.headCount,
        logo: initOrgDetails.logoUrl,
        lastFundingAmount,
        lastFundingDate,
      }
    : null;

  //
  // const urlMetaData = `${FRONTEND_URL}/organizations/${slug}/details`;

  // TODO: image meta data
  // TODO: org meta data

  return (
    <>
      {/* TODO: metadata */}

      <div className={cn('w-full lg:pl-52')}>
        <SideBar />

        <div
          className={cn('px-3.5 pt-[65px] lg:px-8 lg:pt-0', {
            'z-50': showFilters,
            'lg:pr-[50%]': !showFilters,
          })}
        >
          <div
            className={cn({
              'bg-[#121216] w-[101%] pr-12': showFilters,
            })}
          >
            <Filters routeSection={ROUTE_SECTION.ORGANIZATIONS} />
          </div>

          <div
            className={cn({
              'lg:pr-[50%]': showFilters,
            })}
          >
            <OrgList initOrg={initOrgListItem} activeOrgId={activeOrgId} />
          </div>
        </div>

        <div
          className={cn(
            'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10',
            { 'z-50': !showFilters },
            { '-z-50': showFilters },
          )}
        >
          <OrgsRightPanel orgId={orgId} currentTab={tab as string} />
        </div>
      </div>
    </>
  );
};
