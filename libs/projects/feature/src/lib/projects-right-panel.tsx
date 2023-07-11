import { memo } from 'react';

import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';

import { useProjectDetails } from '@jobstash/projects/state';

import { ProjectRightPanelTabs } from '@jobstash/projects/ui';
import {
  RightPanel,
  RightPanelOrgCard,
  RightPanelProjectCard,
} from '@jobstash/right-panel/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  projectId: string | null;
  currentTab: string;
}

const ProjectsRightPanel = ({ projectId, currentTab }: Props) => {
  const { data: projectDetails } = useProjectDetails(projectId);

  if (!projectDetails) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const org = projectDetails.organization;
  const routeSection = ROUTE_SECTION.PROJECTS;

  return (
    <RightPanel
      org={org}
      tabs={
        <ProjectRightPanelTabs
          currentTab={currentTab}
          projectDetails={projectDetails}
        />
      }
      routeSection={ROUTE_SECTION.PROJECTS}
    >
      {currentTab === TAB_SEGMENT.details && (
        <RightPanelProjectCard
          project={projectDetails}
          routeSection={routeSection}
        />
      )}
      {currentTab === TAB_SEGMENT.organization && (
        <RightPanelOrgCard org={org} routeSection={routeSection} />
      )}
    </RightPanel>
  );
};

export default memo(ProjectsRightPanel);
