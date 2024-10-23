import { memo, useCallback, useMemo } from 'react';

import { ProjectDetails } from '@jobstash/projects/core';
import { RightPanelTab } from '@jobstash/right-panel/core';
import { FRONTEND_URL, TAB_SEGMENT } from '@jobstash/shared/core';
import { createProjectKey } from '@jobstash/projects/utils';
import { getPluralText } from '@jobstash/shared/utils';

import { RightPanelTabs } from '@jobstash/right-panel/ui';

interface Props {
  currentTab: string;
  projectDetails: ProjectDetails;
}

const ProjectRightPanelTabs = ({ currentTab, projectDetails }: Props) => {
  const paramsStr = typeof window === 'undefined' ? '' : window.location.search;
  const partialRoute = `${FRONTEND_URL}/projects/${createProjectKey(
    projectDetails,
  )}`;

  const createProjectHref = useCallback(
    (tabSegment: string) => `${partialRoute}/${tabSegment}${paramsStr}`,
    [paramsStr, partialRoute],
  );

  const tabs: RightPanelTab[] = useMemo(() => {
    const tabs: RightPanelTab[] = [
      {
        text: 'Project Details',
        tabSegment: TAB_SEGMENT.details,
        href: createProjectHref(TAB_SEGMENT.details),
      },
    ];

    const orgCount = projectDetails.organizations.length;
    const hasOrg = orgCount > 0;

    if (hasOrg) {
      tabs.push({
        text: getPluralText('Organization', orgCount),
        tabSegment: TAB_SEGMENT.organizations,
        href: createProjectHref(TAB_SEGMENT.organizations),
      });
    }

    return tabs;
  }, [createProjectHref, projectDetails.organizations]);

  if (tabs.length === 1 && tabs[0].tabSegment === 'details') return null;

  return (
    <RightPanelTabs isLoading={false} currentTab={currentTab} tabs={tabs} />
  );
};

export default memo(ProjectRightPanelTabs);
