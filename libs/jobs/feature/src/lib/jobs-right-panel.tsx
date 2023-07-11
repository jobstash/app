import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';
import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';

import { useCompetitors } from '@jobstash/competitors/state';

import {
  RightPanel,
  RightPanelCompetitorCards,
  RightPanelJobCard,
  RightPanelJobTabs,
  RightPanelOrgCard,
  RightPanelProjectCards,
} from '@jobstash/right-panel/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  jobPost: JobPost | null;
  currentTab: string;
}

const JobsRightPanel = ({ jobPost, currentTab }: Props) => {
  const { data: competitors, isLoading: isLoadingCompetitors } = useCompetitors(
    jobPost && jobPost.organization.projects.length > 0
      ? jobPost.organization.projects[0].id
      : undefined,
  );

  // TODO: Repos fetch
  const isLoadingRepo = false;

  if (!jobPost) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const { organization, technologies } = jobPost;
  const { projects } = organization;

  const hasProject = projects.length > 0;

  const isLoading = (hasProject && isLoadingCompetitors) || isLoadingRepo;

  const competitorCount = competitors?.length ?? 0;

  const routeSection = ROUTE_SECTION.JOBS;

  return (
    <RightPanel
      org={organization}
      tabs={
        <RightPanelJobTabs
          isLoading={isLoading}
          currentTab={currentTab}
          jobPost={jobPost}
          competitorCount={competitorCount}
        />
      }
      routeSection={routeSection}
    >
      {currentTab === TAB_SEGMENT.details && (
        <RightPanelJobCard jobInfo={jobPost} technologies={technologies} />
      )}
      {currentTab === TAB_SEGMENT.organization && (
        <RightPanelOrgCard org={organization} routeSection={routeSection} />
      )}
      {currentTab === TAB_SEGMENT.projects && (
        <RightPanelProjectCards
          projects={projects}
          routeSection={routeSection}
        />
      )}
      {currentTab === TAB_SEGMENT.competitors && (
        <RightPanelCompetitorCards competitors={competitors ?? []} />
      )}
    </RightPanel>
  );
};

export default memo(JobsRightPanel);
