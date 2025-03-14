import { useCallback, useMemo } from 'react';

import { type RightPanelTab } from '@jobstash/right-panel/core';
import {
  FRONTEND_URL,
  JobPost,
  JobsRouteSection,
  TAB_SEGMENT,
} from '@jobstash/shared/core';
import { createJobKey } from '@jobstash/jobs/utils';
import { getPluralText } from '@jobstash/shared/utils';

import RightPanelTabs from './right-panel-tabs';

interface Props {
  isLoading: boolean;
  currentTab: string;
  jobPost: JobPost;
  competitorCount: number;
  //
  // orgJobsCount: number;
  routeSection: JobsRouteSection;
}

const RightPanelJobTabs = ({
  isLoading,
  currentTab,
  jobPost,
  competitorCount,
  //
  // orgJobsCount,
  routeSection,
}: Props) => {
  const { organization, project } = jobPost;

  const paramsStr = typeof window === 'undefined' ? '' : window.location.search;
  const partialRoute = `${FRONTEND_URL}${routeSection}/${createJobKey(
    jobPost,
  )}`;

  const createTabHref = useCallback(
    (tabSegment: string) => `${partialRoute}/${tabSegment}${paramsStr}`,
    [paramsStr, partialRoute],
  );

  const projects = useMemo(() => {
    if (!jobPost) return [];
    if (organization) {
      return organization.projects;
    }

    if (project) return [project];

    return [];
  }, [jobPost, organization, project]);

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

    //
    // if (orgJobsCount) {
    //   tabs.push({
    //     text: `Other Jobs (${orgJobsCount})`,
    //     tabSegment: TAB_SEGMENT.otherJobs,
    //     href: createTabHref(TAB_SEGMENT.otherJobs),
    //   });
    // }

    return tabs;
  }, [competitorCount, createTabHref, projects.length]);

  return (
    <RightPanelTabs isLoading={isLoading} currentTab={currentTab} tabs={tabs} />
  );
};

export default RightPanelJobTabs;
