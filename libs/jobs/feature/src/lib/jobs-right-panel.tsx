import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';
import { TAB_SEGMENT } from '@jobstash/shared/core';

import { useCompetitors } from '@jobstash/competitors/state';

import { JobDetails, JobsRightPanelTabs } from '@jobstash/jobs/ui';
import {
  RightPanel,
  RightPanelCompetitorCards,
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

  const { organization } = jobPost;
  const { projects } = organization;

  const hasProject = projects.length > 0;

  const isLoading = (hasProject && isLoadingCompetitors) || isLoadingRepo;

  const competitorCount = competitors?.length ?? 0;

  return (
    <RightPanel
      organization={organization}
      tabs={
        <JobsRightPanelTabs
          isLoading={isLoading}
          currentTab={currentTab}
          jobPost={jobPost}
          competitorCount={competitorCount}
        />
      }
    >
      {currentTab === TAB_SEGMENT.details && <JobDetails jobPost={jobPost} />}
      {currentTab === TAB_SEGMENT.organization && (
        <RightPanelOrgCard organization={organization} />
      )}
      {currentTab === TAB_SEGMENT.projects && (
        <RightPanelProjectCards projects={projects} />
      )}
      {currentTab === TAB_SEGMENT.competitors && (
        <RightPanelCompetitorCards competitors={competitors ?? []} />
      )}
    </RightPanel>
  );
};

export default memo(JobsRightPanel);
