import type { Listing, RouteSegments } from '~/core/interfaces';

import { RightPanelJob, RightPanelJobs } from './right-panel-jobs';
import { RightPanelOrg } from './right-panel-org';
import { RightPanelProject, RightPanelProjects } from './right-panel-projects';
import { RightPanelRepo } from './right-panel-repo';

type SectionSegment = RouteSegments['section'];
type TabSegment = RouteSegments['tab'];

interface Props {
  activeListing: Listing;
  section: SectionSegment;
  tabSegment: TabSegment;
}

export const RightPanelCard = ({
  activeListing,
  section,
  tabSegment,
}: Props): JSX.Element => {
  const { org, jobs, projects, competitors, repositories } = activeListing;

  const detailsMap: Record<SectionSegment, JSX.Element> = {
    jobs: <RightPanelJob job={jobs[0]} />,
    organizations: <RightPanelOrg org={org} />,
    projects: <RightPanelProject project={projects[0]} />,
    repositories: <RightPanelRepo repos={[repositories[0]]} />,
  };

  const cardMap: Record<TabSegment, JSX.Element> = {
    details: detailsMap[section],
    jobs: <RightPanelJobs jobs={jobs} />,
    organization: <RightPanelOrg org={org} />,
    projects: <RightPanelProjects projects={projects} />,
    competitors: <RightPanelProjects projects={competitors} />,
    repositories: <RightPanelRepo repos={repositories} />,
  };

  return cardMap[tabSegment];
};
