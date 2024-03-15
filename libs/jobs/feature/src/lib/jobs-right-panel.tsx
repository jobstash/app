import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';
import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';

import { useCompetitors } from '@jobstash/competitors/state';
import { useOrgDetails } from '@jobstash/organizations/state';

import {
  RightPanel,
  RightPanelBackButton,
  RightPanelCompetitorCards,
  RightPanelJobCard,
  RightPanelJobTabs,
  RightPanelOrgCard,
  RightPanelOrgJobCards,
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

  const orgId = jobPost?.organization.orgId ?? null;
  const { data: orgDetails, isLoading: isLoadingOrgDetails } =
    useOrgDetails(orgId);

  // TODO: Repos fetch
  const isLoadingRepo = false;

  if (!jobPost) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const { id, organization, tags } = jobPost;
  const { projects } = organization;

  const hasProject = projects.length > 0;

  const isLoading = [
    hasProject && isLoadingCompetitors,
    isLoadingRepo,
    isLoadingOrgDetails,
  ].includes(true);

  const competitorCount = competitors?.length ?? 0;

  const orgJobs = orgDetails
    ? orgDetails.jobs.filter((job) => job.id !== id)
    : [];
  const orgJobsCount = orgJobs.length;

  return (
    <RightPanel
      org={organization}
      tabs={
        <RightPanelJobTabs
          isLoading={isLoading}
          currentTab={currentTab}
          jobPost={jobPost}
          competitorCount={competitorCount}
          orgJobsCount={orgJobsCount}
        />
      }
      backButton={<RightPanelBackButton backURL={ROUTE_SECTION.JOBS} />}
    >
      {currentTab === TAB_SEGMENT.details && (
        <RightPanelJobCard
          orgName={organization.name}
          jobInfo={jobPost}
          tags={tags}
          showExploreJob={false}
        />
      )}

      {currentTab === TAB_SEGMENT.organization && (
        <RightPanelOrgCard
          org={organization}
          routeSection={ROUTE_SECTION.JOBS}
        />
      )}

      {currentTab === TAB_SEGMENT.projects && (
        <RightPanelProjectCards projects={projects} />
      )}

      {currentTab === TAB_SEGMENT.competitors && (
        <RightPanelCompetitorCards competitors={competitors ?? []} />
      )}

      {orgDetails && currentTab === TAB_SEGMENT.otherJobs && (
        <RightPanelOrgJobCards orgName={orgDetails.name} orgJobs={orgJobs} />
      )}
    </RightPanel>
  );
};

export default memo(JobsRightPanel);
