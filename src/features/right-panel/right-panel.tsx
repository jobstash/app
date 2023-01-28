import { ReactNode } from 'react';

import {
  LABEL_COMPETITORS,
  LABEL_PROJECT,
  LABEL_REPOSITORIES,
  rightPanelTabs,
} from '~/core/constants';
import { RouteSegments } from '~/core/interfaces';
import { RouterPush } from '~/core/types';
import { useRootContext } from '~/hooks/use-root-context';

import { RightPanelHeader } from './right-panel-header';
import { RightPanelJobDetails } from './right-panel-job-details';
import { RightPanelOrgDetails } from './right-panel-org-details';
import { RightPanelProjectDetails } from './right-panel-project-details';
import { RightPanelTab } from './right-panel-tab';

interface Props {
  segments: RouteSegments;
  push: RouterPush;
}

interface SectionDetailsMap {
  jobs: {
    details: ReactNode;
    organization: ReactNode;
    project: ReactNode;
    competitors: ReactNode;
    repositories: ReactNode;
  };
}

const emptyJobsSectionDetails = {
  details: null,
  organization: null,
  project: null,
  competitors: null,
  repositories: null,
};

/** UNSTYLED */
export const RightPanel = ({ segments, push }: Props) => {
  const { activeCards } = useRootContext();

  const sectionDetailsMap: SectionDetailsMap = {
    // Do not render details if no job present (SSR page waits for first element from server)
    jobs: activeCards.jobs?.job
      ? {
          ...emptyJobsSectionDetails,
          details: <RightPanelJobDetails job={activeCards.jobs.job} />,
          organization: <RightPanelOrgDetails org={activeCards.jobs.org} />,
          project: activeCards.jobs.project ? (
            <RightPanelProjectDetails project={activeCards.jobs.project} />
          ) : null,
        }
      : emptyJobsSectionDetails,
  };

  // ? Way of checking tabs for each section: jobs, orgs, projects, repositories

  const checkShouldRenderTab = (tab: string) => {
    // Check for optional job tabs: Projects, Competitors, Repositories
    if (segments.section === 'jobs') {
      if (tab === LABEL_PROJECT && !activeCards.jobs?.project) return false;
      if (tab === LABEL_COMPETITORS && !activeCards.jobs?.competitors)
        return false;
      if (tab === LABEL_REPOSITORIES && !activeCards.jobs?.repositories)
        return false;
    }

    return true;
  };

  return (
    <div className="hide-scrollbar sticky top-0 max-h-screen overflow-y-scroll px-6">
      {activeCards.jobs?.org && (
        <RightPanelHeader org={activeCards.jobs?.org} />
      )}

      <hr className="h-px border-0 bg-neutral-500" />

      <div className="flex space-x-4 py-10">
        {rightPanelTabs.map(
          (tab) =>
            checkShouldRenderTab(tab) && (
              <RightPanelTab
                key={tab}
                label={tab}
                segments={segments}
                push={push}
              />
            ),
        )}
      </div>

      {sectionDetailsMap[segments.section][segments.tab]}
    </div>
  );
};
