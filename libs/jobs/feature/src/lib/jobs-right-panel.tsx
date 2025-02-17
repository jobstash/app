/* eslint-disable complexity */
import { memo, useMemo } from 'react';

import {
  JobPost,
  JobsRouteSection,
  ROUTE_SECTION,
  TAB_SEGMENT,
} from '@jobstash/shared/core';
import { getJobLogoTitleProps } from '@jobstash/jobs/utils';

import { useCompetitors } from '@jobstash/competitors/state';
import { useOrgDetails } from '@jobstash/organizations/state';
import { usePageScrollDisableSyncer } from '@jobstash/shared/state';

import {
  createRightPanelOrgTags,
  RightPanel,
  RightPanelBackButton,
  RightPanelCompetitorCards,
  RightPanelHeader,
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
  routeSection: JobsRouteSection;
}

const JobsRightPanel = ({ jobPost, currentTab, routeSection }: Props) => {
  const projectId = useMemo(() => {
    if (!jobPost) return null;
    if (!jobPost.project && !jobPost.organization) return null;

    if (jobPost.organization && jobPost.organization.projects.length > 0) {
      return jobPost.organization.projects[0].id;
    }

    if (jobPost.project) {
      return jobPost.project.id;
    }

    return null;
  }, [jobPost]);

  const projects = useMemo(() => {
    if (!jobPost) return [];
    if (jobPost.organization) {
      return jobPost.organization.projects;
    }

    if (jobPost.project) return [jobPost.project];

    return [];
  }, [jobPost]);

  const { data: competitors, isLoading: isLoadingCompetitors } =
    useCompetitors(projectId);

  const orgId = jobPost?.organization?.orgId ?? null;
  const { data: orgDetails, isLoading: isLoadingOrgDetails } =
    useOrgDetails(orgId);

  // TODO: Repos fetch
  const isLoadingRepo = false;

  usePageScrollDisableSyncer({ shouldDisable: true });

  if (!jobPost) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const { id, organization, tags, project } = jobPost;

  const hasProject = projects.length > 0;

  const isLoading = [
    hasProject && isLoadingCompetitors,
    isLoadingRepo,
    isLoadingOrgDetails,
  ].includes(true);

  const competitorCount = competitors?.length ?? 0;

  //
  // const orgJobs = orgDetails
  //   ? orgDetails.jobs.filter((job) => job.id !== id)
  //   : [];
  // const orgJobsCount = orgJobs.length;

  const { name, logo, website } = getJobLogoTitleProps(jobPost);

  return (
    <RightPanel
      header={
        name ? (
          <RightPanelHeader
            name={name}
            website={website}
            logo={logo}
            description={organization?.summary || project?.description || null}
            socials={organization ?? project ?? null}
            tags={organization ? createRightPanelOrgTags(organization) : []}
            community={organization?.community || []}
          />
        ) : null
      }
      tabs={
        <RightPanelJobTabs
          isLoading={isLoading}
          currentTab={currentTab}
          jobPost={jobPost}
          competitorCount={competitorCount}
          //
          // orgJobsCount={orgJobsCount}
          routeSection={routeSection}
        />
      }
      backButton={<RightPanelBackButton backURL={ROUTE_SECTION.JOBS} />}
    >
      {currentTab === TAB_SEGMENT.details && (
        <RightPanelJobCard
          orgName={
            organization ? organization.name : project ? project.name : ''
          }
          jobInfo={jobPost}
          tags={tags}
          showExploreJob={false}
          hasUser={organization?.hasUser || project?.hasUser}
        />
      )}

      {currentTab === TAB_SEGMENT.organization && organization && (
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

      {/* {orgDetails && currentTab === TAB_SEGMENT.otherJobs && (
        <RightPanelOrgJobCards orgName={orgDetails.name} orgJobs={orgJobs} />
      )} */}
    </RightPanel>
  );
};

export default memo(JobsRightPanel);
