import { memo } from 'react';

import clsx from 'clsx';

import { Job } from '~/features/jobs/core/types';
import {
  TEXT_ROUTE_TAB_COMPETITORS,
  TEXT_ROUTE_TAB_DETAILS,
  TEXT_ROUTE_TAB_ORGANIZATION,
  TEXT_ROUTE_TAB_PROJECT,
  TEXT_ROUTE_TAB_REPOSITORIES,
} from '~/shared/core/constants';

import RightPanelCompetitorsCard from '../right-panel-competitors-card';
import { RightPanelJobCard } from '../right-panel-job-card';
import { RightPanelOrgCard } from '../right-panel-org-card';
import { RightPanelProjectCard } from '../right-panel-project-card';
import RightPanelRepoCard from '../right-panel-repo-card';

interface Props {
  tabSegment: string;
  isPending: boolean;
  job: Job;
}

const JobRightPanelCard = ({
  tabSegment,
  isPending,
  job: { jobpost, organization, project, technologies },
}: Props) => (
  <div
    className={clsx(
      'mt-8 rounded-3xl bg-gradient-to-l from-primary to-tertiary p-0.5',
      { 'select-none pointer-events-none': isPending },
    )}
  >
    <div className="rounded-3xl bg-darker-gray">
      {tabSegment === TEXT_ROUTE_TAB_DETAILS && (
        <RightPanelJobCard job={jobpost} technologies={technologies} />
      )}
      {tabSegment === TEXT_ROUTE_TAB_ORGANIZATION && (
        <RightPanelOrgCard org={organization} />
      )}
      {project && tabSegment === TEXT_ROUTE_TAB_PROJECT && (
        <RightPanelProjectCard project={project} />
      )}
      {tabSegment === TEXT_ROUTE_TAB_REPOSITORIES && <RightPanelRepoCard />}
      {tabSegment === TEXT_ROUTE_TAB_COMPETITORS && (
        <RightPanelCompetitorsCard />
      )}
    </div>
  </div>
);

export default memo(JobRightPanelCard);
