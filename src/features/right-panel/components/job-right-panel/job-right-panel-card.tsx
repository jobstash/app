import { memo } from 'react';

import clsx from 'clsx';

import type { Job } from '~/features/jobs/core/types';
import {
  TEXT_ROUTE_TAB_COMPETITORS,
  TEXT_ROUTE_TAB_DETAILS,
  TEXT_ROUTE_TAB_ORGANIZATION,
  TEXT_ROUTE_TAB_PROJECT,
  TEXT_ROUTE_TAB_REPOSITORIES,
} from '~/shared/core/constants';
import { Repository } from '~/shared/core/interfaces';

import RightPanelCompetitorsCards from '../right-panel-competitors-cards';
import { RightPanelJobCard } from '../right-panel-job-card';
import { RightPanelOrgCard } from '../right-panel-org-card';
import { RightPanelProjectCard } from '../right-panel-project-card';
import RightPanelRepoCards from '../right-panel-repo-cards';

interface Props {
  tabSegment: string;
  isPending: boolean;
  job: Job;
  repos: Repository[] | undefined;
}

const JobRightPanelCard = ({
  tabSegment,
  isPending,
  job: {
    jobpost,
    organization,
    project,
    technologies,
    fundingRounds,
    investors,
    categories,
  },
  repos,
}: Props) => {
  if (tabSegment === TEXT_ROUTE_TAB_COMPETITORS) {
    return <RightPanelCompetitorsCards isPending={isPending} />;
  }

  if (tabSegment === TEXT_ROUTE_TAB_REPOSITORIES) {
    return <RightPanelRepoCards isPending={isPending} repos={repos ?? []} />;
  }

  return (
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
          <RightPanelOrgCard
            org={organization}
            fundingRounds={fundingRounds}
            investors={investors}
          />
        )}
        {project && tabSegment === TEXT_ROUTE_TAB_PROJECT && (
          <RightPanelProjectCard
            project={project}
            categories={categories ?? []}
          />
        )}
      </div>
    </div>
  );
};

export default memo(JobRightPanelCard);
