import { memo, useCallback, useMemo } from 'react';

import { type OrgDetails } from '@jobstash/organizations/core';
import { RightPanelTab } from '@jobstash/right-panel/core';
import { FRONTEND_URL, TAB_SEGMENT } from '@jobstash/shared/core';
import { createOrgKey } from '@jobstash/organizations/utils';
import { getPluralText } from '@jobstash/shared/utils';

import { RightPanelTabs } from '@jobstash/right-panel/ui';

interface Props {
  currentTab: string;
  orgDetails: OrgDetails;
}

const OrgRightPanelTabs = ({ currentTab, orgDetails }: Props) => {
  const { jobs, projects } = orgDetails;

  const paramsStr = typeof window === 'undefined' ? '' : window.location.search;
  const partialRoute = `${FRONTEND_URL}/organizations/${createOrgKey(
    orgDetails,
  )}`;

  const createOrgHref = useCallback(
    (tabSegment: string) => `${partialRoute}/${tabSegment}${paramsStr}`,
    [paramsStr, partialRoute],
  );

  const tabs: RightPanelTab[] = useMemo(() => {
    const tabs: RightPanelTab[] = [
      {
        text: 'Organization Details',
        tabSegment: TAB_SEGMENT.details,
        href: createOrgHref(TAB_SEGMENT.details),
      },
    ];

    const projectCount = projects.length;
    if (projectCount) {
      tabs.push({
        text: `${getPluralText('Project', projectCount)} (${projectCount})`,
        tabSegment: TAB_SEGMENT.projects,
        href: createOrgHref(TAB_SEGMENT.projects),
      });
    }

    const jobCount = jobs.length;
    if (jobCount) {
      tabs.push({
        text: `${getPluralText('Job', jobCount)} (${jobCount})`,
        tabSegment: TAB_SEGMENT.jobs,
        href: createOrgHref(TAB_SEGMENT.jobs),
      });
    }

    //
    // tabs.push({
    //   text: 'Reviews',
    //   tabSegment: TAB_SEGMENT.reviews,
    //   href: createOrgHref(TAB_SEGMENT.reviews),
    // });

    return tabs;
  }, [createOrgHref, jobs.length, projects.length]);

  return (
    <RightPanelTabs isLoading={false} currentTab={currentTab} tabs={tabs} />
  );
};

export default memo(OrgRightPanelTabs);
