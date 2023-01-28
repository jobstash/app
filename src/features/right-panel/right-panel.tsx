import { ReactNode, useEffect } from 'react';

import {
  EVENT_CARD_CLICK,
  ID_TOP_RIGHT_PANEL,
  LABEL_COMPETITORS,
  LABEL_PROJECT,
  LABEL_REPOSITORIES,
  rightPanelTabs,
} from '~/core/constants';
import { RouteSegments } from '~/core/interfaces';
import { RouterPush } from '~/core/types';
import { useRootContext } from '~/hooks/use-root-context';

import { RightPanelCompetitorsDetails } from './right-panel-competitors-details';
import { RightPanelHeader } from './right-panel-header';
import { RightPanelJobDetails } from './right-panel-job-details';
import { RightPanelOrgDetails } from './right-panel-org-details';
import { RightPanelProjectDetails } from './right-panel-project-details';
import { RightPanelRepoDetails } from './right-panel-repo-details';
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
          details: <RightPanelJobDetails job={activeCards.jobs.job} />,
          organization: <RightPanelOrgDetails org={activeCards.jobs.org} />,
          project: activeCards.jobs.project ? (
            <RightPanelProjectDetails project={activeCards.jobs.project} />
          ) : null,
          repositories:
            activeCards.jobs.repositories &&
            activeCards.jobs.repositories.length > 0 ? (
              <RightPanelRepoDetails repos={activeCards.jobs.repositories} />
            ) : null,
          competitors:
            activeCards.jobs.competitors &&
            activeCards.jobs.competitors.length > 0 ? (
              <RightPanelCompetitorsDetails
                competitors={activeCards.jobs.competitors}
              />
            ) : null,
        }
      : emptyJobsSectionDetails,
  };

  const checkShouldRenderTab = (tab: string) => {
    // Check for optional job tabs: Projects, Competitors, Repositories
    if (segments.section === 'jobs') {
      if (tab === LABEL_PROJECT && !sectionDetailsMap.jobs.project)
        return false;
      if (tab === LABEL_COMPETITORS && !sectionDetailsMap.jobs.competitors)
        return false;
      if (tab === LABEL_REPOSITORIES && !sectionDetailsMap.jobs.repositories)
        return false;
    }

    return true;
  };

  // Whenever a card is clicked, scroll right-panel to top
  useEffect(() => {
    const scrollListener = () => {
      const el = document.querySelector('#asdf-asdf');
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    document.addEventListener(EVENT_CARD_CLICK, scrollListener);

    return () => document.removeEventListener(EVENT_CARD_CLICK, scrollListener);
  }, []);

  return (
    <div className="hide-scrollbar sticky top-0 max-h-screen overflow-y-scroll px-6">
      <div className="top-0" id={ID_TOP_RIGHT_PANEL} />
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
