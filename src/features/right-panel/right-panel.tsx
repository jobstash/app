import { type ReactNode, useEffect } from 'react';

import { ActiveSectionCards } from '~/contexts/root-context';
import {
  EVENT_CARD_CLICK,
  ID_TOP_RIGHT_PANEL,
  LABEL_COMPETITORS,
  LABEL_PROJECT,
  LABEL_REPOSITORIES,
  rightPanelTabs,
} from '~/core/constants';
import type { RouteSegments } from '~/core/interfaces';
import { RouterPush } from '~/core/types';
import { useRootContext } from '~/hooks/use-root-context';

import { RightPanelCompetitors } from './right-panel-competitors';
import { RightPanelHeader } from './right-panel-header';
import { RightPanelJob } from './right-panel-job';
import { RightPanelOrg } from './right-panel-org';
import { RightPanelProject } from './right-panel-project';
import { RightPanelRepo } from './right-panel-repo';
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

const emptyJobsSectionDetails: SectionDetailsMap['jobs'] = {
  details: null,
  organization: null,
  project: null,
  competitors: null,
  repositories: null,
};

const getJobsRightPanelDetails = (
  jobs: ActiveSectionCards['jobs'],
): SectionDetailsMap['jobs'] => {
  if (!jobs) return emptyJobsSectionDetails;

  const { job, org, project, repositories, competitors } = jobs;

  const hasRepos = repositories && repositories.length > 0;
  const hasCompetitors = competitors && competitors.length > 0;

  return jobs
    ? {
        details: <RightPanelJob job={job} />,
        organization: <RightPanelOrg org={org} />,
        project: project ? <RightPanelProject project={project} /> : null,
        repositories: hasRepos ? <RightPanelRepo repos={repositories} /> : null,
        competitors: hasCompetitors ? (
          <RightPanelCompetitors competitors={competitors} />
        ) : null,
      }
    : emptyJobsSectionDetails;
};

/** UNSTYLED */
export const RightPanel = ({ segments, push }: Props) => {
  const {
    activeCards: { jobs },
  } = useRootContext();

  const sectionDetailsMap: SectionDetailsMap = {
    jobs: getJobsRightPanelDetails(jobs),
  };

  const checkShouldRenderTab = (tab: string) => {
    const { project, competitors, repositories } = sectionDetailsMap.jobs;

    // Check for optional job tabs: Projects, Competitors, Repositories
    if (segments.section === 'jobs') {
      if (tab === LABEL_PROJECT && !project) return false;
      if (tab === LABEL_COMPETITORS && !competitors) return false;
      if (tab === LABEL_REPOSITORIES && !repositories) return false;
    }

    return true;
  };

  // Whenever a card is clicked, scroll right-panel to top
  useEffect(() => {
    const scrollListener = () => {
      const el = document.querySelector('#' + ID_TOP_RIGHT_PANEL);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    document.addEventListener(EVENT_CARD_CLICK, scrollListener);

    return () => document.removeEventListener(EVENT_CARD_CLICK, scrollListener);
  }, []);

  // Note: Server rendered pages wait for first element from server
  if (!jobs) return null;

  return (
    <div className="hide-scrollbar sticky top-0 max-h-screen space-y-6 overflow-y-scroll px-6">
      <div className="top-0" id={ID_TOP_RIGHT_PANEL} />
      {jobs?.org && <RightPanelHeader org={jobs?.org} />}

      <div className="">
        <hr className="h-px border-0 bg-white/20" />
      </div>

      <div className="flex space-x-4">
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

      <div className="">
        {sectionDetailsMap[segments.section][segments.tab]}
      </div>
    </div>
  );
};
