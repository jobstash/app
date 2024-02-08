import Head from 'next/head';
import { memo } from 'react';

import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';
import { createProjectPageTitle } from '@jobstash/projects/utils';

import { useProjectDetails } from '@jobstash/projects/state';

import { ProjectRightPanelTabs } from '@jobstash/projects/ui';
import {
  RightPanel,
  RightPanelBackButton,
  RightPanelOrgCard,
  RightPanelProjectCard,
} from '@jobstash/right-panel/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  projectId: string | null;
  currentTab: string;
  hasTitle?: boolean;
}

const ProjectsRightPanel = ({ projectId, currentTab, hasTitle }: Props) => {
  const { data: projectDetails } = useProjectDetails(projectId);

  if (!projectDetails) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const org = projectDetails.organization;

  return (
    <RightPanel
      org={org}
      tabs={
        <ProjectRightPanelTabs
          currentTab={currentTab}
          projectDetails={projectDetails}
        />
      }
      backButton={<RightPanelBackButton backURL={ROUTE_SECTION.PROJECTS} />}
    >
      {hasTitle && projectDetails && (
        <Head>
          <title>
            {createProjectPageTitle(projectDetails.name, currentTab)}
          </title>
        </Head>
      )}

      {currentTab === TAB_SEGMENT.details && (
        <RightPanelProjectCard project={projectDetails} showCTA={false} />
      )}
      {currentTab === TAB_SEGMENT.organization && (
        <RightPanelOrgCard org={org} routeSection={ROUTE_SECTION.PROJECTS} />
      )}
    </RightPanel>
  );
};

export default memo(ProjectsRightPanel);
