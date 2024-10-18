import { memo, useCallback, useMemo } from 'react';

import { ProjectDetails } from '@jobstash/projects/core';
import { RightPanelTab } from '@jobstash/right-panel/core';
import { FRONTEND_URL, TAB_SEGMENT } from '@jobstash/shared/core';
import { createProjectKey } from '@jobstash/projects/utils';

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

    if (projectDetails.organization) {
      tabs.push({
        text: 'Organization',
        tabSegment: TAB_SEGMENT.organization,
        href: createProjectHref(TAB_SEGMENT.organization),
      });
    }

    return tabs;
  }, [createProjectHref, projectDetails.organization]);

  if (tabs.length === 1 && tabs[0].tabSegment === 'details') return null;

  return (
    <RightPanelTabs isLoading={false} currentTab={currentTab} tabs={tabs} />
  );
};

export default memo(ProjectRightPanelTabs);
