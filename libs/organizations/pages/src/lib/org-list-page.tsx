import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';

import { type OrgDetails } from '@jobstash/organizations/core';
import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeOrgIdAtom } from '@jobstash/organizations/state';
import { useIsMobile } from '@jobstash/shared/state';

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

interface Props {
  initActiveOrg: OrgDetails | null;
}

export const OrgListPage = ({ initActiveOrg }: Props) => {
  const activeOrgId = useAtomValue(activeOrgIdAtom);
  const showFilters = useAtomValue(showFiltersAtom);
  const isMobile = useIsMobile();

  return (
    <div className="w-full lg:pl-52">
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
          <OrgList initOrg={null} activeOrgId={activeOrgId} />
        </div>
      </div>

      {activeOrgId && !isMobile && (
        <div
          className={cn(
            'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10',
            { 'z-50': !showFilters },
            { '-z-50': showFilters },
          )}
        >
          <OrgsRightPanel
            orgId={initActiveOrg?.orgId ?? activeOrgId}
            currentTab={TAB_SEGMENT.details}
          />
        </div>
      )}
    </div>
  );
};
