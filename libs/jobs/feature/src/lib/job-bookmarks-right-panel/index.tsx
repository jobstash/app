import { useMemo } from 'react';

import { useAtomValue } from 'jotai';

import { JobPost, ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';
import { getJobLogoTitleProps } from '@jobstash/jobs/utils';

import { useCompetitors } from '@jobstash/competitors/state';
import { activeJobBookmarkTabAtom } from '@jobstash/jobs/state';

import {
  createRightPanelOrgTags,
  RightPanel,
  RightPanelBackButton,
  RightPanelCompetitorCards,
  RightPanelHeader,
  RightPanelJobCard,
  RightPanelOrgCard,
  RightPanelProjectCards,
} from '@jobstash/right-panel/ui';

import JobBookmarksRightPanelTabs from './tabs';

interface Props {
  jobPost: JobPost;
  onClickBack: () => void;
}

const JobBookmarksRightPanel = ({ jobPost, onClickBack }: Props) => {
  const { organization, project, tags } = jobPost;

  const projectId = useMemo(() => {
    if (!project && !organization) return null;

    if (organization && organization.projects.length > 0) {
      return organization.projects[0].id;
    }

    if (project) {
      return project.id;
    }

    return null;
  }, [organization, project]);

  const projects = useMemo(() => {
    if (organization) {
      return organization.projects;
    }

    if (project) return [project];

    return [];
  }, [organization, project]);

  const { data: competitors, isLoading: isLoadingCompetitors } =
    useCompetitors(projectId);
  const competitorCount = competitors?.length ?? 0;

  const currentTab = useAtomValue(activeJobBookmarkTabAtom);

  const { name, logo, website } = getJobLogoTitleProps(jobPost);

  return (
    <RightPanel
      hideMenu
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
        <JobBookmarksRightPanelTabs
          jobPost={jobPost}
          showSpinner={isLoadingCompetitors && Boolean(projectId)}
          competitorCount={competitorCount}
        />
      }
      backButton={<RightPanelBackButton onClick={onClickBack} />}
    >
      {currentTab === TAB_SEGMENT.details && (
        <RightPanelJobCard
          orgName={
            organization ? organization.name : project ? project.name : ''
          }
          jobInfo={jobPost}
          tags={tags}
          hasUser={organization?.hasUser || project?.hasUser}
          showExploreJob={false}
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
    </RightPanel>
  );
};

export default JobBookmarksRightPanel;
