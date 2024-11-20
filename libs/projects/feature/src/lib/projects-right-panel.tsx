import Head from 'next/head';
import { memo } from 'react';

import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';
import { createProjectPageTitle } from '@jobstash/projects/utils';

import { useProjectDetails } from '@jobstash/projects/state';

import { ProjectRightPanelTabs } from '@jobstash/projects/ui';
import {
  RightPanel,
  RightPanelBackButton,
  RightPanelHeader,
  RightPanelOrgCards,
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

  const { organizations, name, website, logo, description } = projectDetails;

  const hasOrg = organizations.length > 0;
  const org = hasOrg ? organizations[0] : null;

  return (
    <RightPanel
      header={
        <RightPanelHeader
          name={name}
          website={website}
          logo={logo}
          description={description || null}
          socials={projectDetails}
          tags={[]}
          community={[]}
        />
      }
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
          <title>{createProjectPageTitle(name, currentTab)}</title>
        </Head>
      )}

      {currentTab === TAB_SEGMENT.details && (
        <RightPanelProjectCard project={projectDetails} showCTA={false} />
      )}
      {currentTab === TAB_SEGMENT.organizations && org && (
        <RightPanelOrgCards
          orgs={organizations}
          routeSection={ROUTE_SECTION.PROJECTS}
        />
      )}
    </RightPanel>
  );
};

export default memo(ProjectsRightPanel);
