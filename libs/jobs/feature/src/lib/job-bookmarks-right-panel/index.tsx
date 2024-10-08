import { useAtomValue } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';
import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';

import { useCompetitors } from '@jobstash/competitors/state';
import { activeJobBookmarkTabAtom } from '@jobstash/jobs/state';

import {
  RightPanel,
  RightPanelBackButton,
  RightPanelCompetitorCards,
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
  const { organization, tags } = jobPost;
  const { projects, name: orgName } = organization;

  const projectId = projects[0]?.id;
  const { data: competitors, isLoading: isLoadingCompetitors } =
    useCompetitors(projectId);
  const competitorCount = competitors?.length ?? 0;

  const currentTab = useAtomValue(activeJobBookmarkTabAtom);

  return (
    <RightPanel
      hideMenu
      org={organization}
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
          orgName={orgName}
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
    </RightPanel>
  );
};

export default JobBookmarksRightPanel;
