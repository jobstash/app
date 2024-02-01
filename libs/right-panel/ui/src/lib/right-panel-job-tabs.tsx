import { useCallback, useMemo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';
import { type RightPanelTab } from '@jobstash/right-panel/core';
import { FRONTEND_URL, TAB_SEGMENT } from '@jobstash/shared/core';
import { createJobKey } from '@jobstash/jobs/utils';
import { getPluralText } from '@jobstash/shared/utils';

import RightPanelTabs from './right-panel-tabs';

interface Props {
  isLoading: boolean;
  currentTab: string;
  jobPost: JobPost;
  competitorCount: number;
  orgJobsCount: number;
}

const RightPanelJobTabs = ({
  isLoading,
  currentTab,
  jobPost,
  competitorCount,
  orgJobsCount,
}: Props) => {
  const {
    organization: { projects },
  } = jobPost;

  const paramsStr = typeof window === 'undefined' ? '' : window.location.search;
  const partialRoute = `${FRONTEND_URL}/jobs/${createJobKey(jobPost)}`;

  const createTabHref = useCallback(
    (tabSegment: string) => `${partialRoute}/${tabSegment}${paramsStr}`,
    [paramsStr, partialRoute],
  );

  const tabs: RightPanelTab[] = useMemo(() => {
    const tabs: RightPanelTab[] = [
      {
        text: 'Job Details',
        tabSegment: TAB_SEGMENT.details,
        href: createTabHref(TAB_SEGMENT.details),
      },
      {
        text: 'Organization',
        tabSegment: TAB_SEGMENT.organization,
        href: createTabHref(TAB_SEGMENT.organization),
      },
    ];

    const projectsLength = projects.length;
    const hasProject = projectsLength > 0;

    if (hasProject) {
      tabs.push({
        text: `${getPluralText('Project', projectsLength)} (${projectsLength})`,
        tabSegment: TAB_SEGMENT.projects,
        href: createTabHref(TAB_SEGMENT.projects),
      });
    }

    if (competitorCount) {
      tabs.push({
        text: `${getPluralText(
          'Competitor',
          competitorCount,
        )} (${competitorCount})`,
        tabSegment: TAB_SEGMENT.competitors,
        href: createTabHref(TAB_SEGMENT.competitors),
      });
    }

    if (orgJobsCount) {
      tabs.push({
        text: `Jobs Here (${orgJobsCount})`,
        tabSegment: TAB_SEGMENT.jobsHere,
        href: createTabHref(TAB_SEGMENT.jobsHere),
      });
    }

    return tabs;
  }, [competitorCount, createTabHref, orgJobsCount, projects.length]);

  return (
    <RightPanelTabs isLoading={isLoading} currentTab={currentTab} tabs={tabs} />
  );
};

export default RightPanelJobTabs;
