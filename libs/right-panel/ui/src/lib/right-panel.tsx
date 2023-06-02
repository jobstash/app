import { memo, useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';

import { useCompetitors } from '@jobstash/competitors/state';
import { mobileRightPanelOpenAtom } from '@jobstash/shared/state';

import { Loader } from '@jobstash/shared/ui';

import RightPanelCompetitorCards from './right-panel-competitor-cards';
import RightPanelHeader from './right-panel-header';
import RightPanelHeaderMobile from './right-panel-header-mobile';
import RightPanelJobCard from './right-panel-job-card';
import { RightPanelOrgCard } from './right-panel-org-card';
import RightPanelProjectCards from './right-panel-project-cards';
import RightPanelTabs from './right-panel-tabs';
import RightPanelWrapper from './right-panel-wrapper';

interface Props {
  jobPost?: JobPost;
  slug: string;
  currentTab: string;
}

const RightPanel = ({ jobPost, slug, currentTab }: Props) => {
  const { data: competitors, isLoading: isLoadingCompetitors } = useCompetitors(
    jobPost && jobPost.organization.projects.length > 0
      ? jobPost.organization.projects[0].id
      : undefined,
  );

  // TODO: Repos fetch
  const isLoadingRepo = false;

  // Disable main window scroll when mobile right-panel is open
  const mobileRightPanelOpenValue = useAtomValue(mobileRightPanelOpenAtom);
  useEffect(() => {
    const el = document.querySelectorAll('html')[0];
    if (mobileRightPanelOpenValue) {
      el.classList.add('disable-scroll');
    } else {
      el.classList.remove('disable-scroll');
    }
  }, [mobileRightPanelOpenValue]);

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

  return (
    <RightPanelWrapper>
      <RightPanelHeaderMobile />
      <RightPanelHeader organization={organization} />
      <RightPanelTabs
        isLoading={isLoading}
        jobPost={jobPost}
        slug={slug}
        currentTab={currentTab}
        competitors={competitors ?? []}
      />
      {currentTab === 'details' && <RightPanelJobCard jobPost={jobPost} />}
      {currentTab === 'organization' && (
        <RightPanelOrgCard organization={organization} />
      )}
      {currentTab === 'projects' && (
        <RightPanelProjectCards projects={projects} />
      )}
      {currentTab === 'competitors' && (
        <RightPanelCompetitorCards competitors={competitors ?? []} />
      )}
    </RightPanelWrapper>
  );
};

export default memo(RightPanel);
