import { memo } from 'react';

import clsx from 'clsx';

import type { JobListResult } from '~/features/jobs/core/types';
import {
  TEXT_ROUTE_TAB_COMPETITORS,
  TEXT_ROUTE_TAB_DETAILS,
  TEXT_ROUTE_TAB_ORGANIZATION,
  TEXT_ROUTE_TAB_PROJECT,
  TEXT_ROUTE_TAB_REPOSITORIES,
} from '~/shared/core/constants';
import type { Competitor, Repository } from '~/shared/core/interfaces';

import RightPanelCompetitorsCards from '../right-panel-competitors-cards';
import { RightPanelJobCard } from '../right-panel-job-card';
import { RightPanelOrgCard } from '../right-panel-org-card';
import { RightPanelProjectCard } from '../right-panel-project-card';
import RightPanelProjectCards from '../right-panel-project-cards';
import RightPanelRepoCards from '../right-panel-repo-cards';

interface Props {
  tabSegment: string;
  isPending: boolean;
  jobListResult: JobListResult;
  repos: Repository[] | undefined;
  competitors: Competitor[] | undefined;
}

const JobRightPanelCard = ({
  tabSegment,
  isPending,
  jobListResult,
  repos,
  competitors,
}: Props) => {
  const { organization, technologies } = jobListResult;
  const { projects } = organization;

  if (tabSegment === TEXT_ROUTE_TAB_COMPETITORS) {
    return <RightPanelCompetitorsCards competitors={competitors ?? []} />;
  }

  if (tabSegment === TEXT_ROUTE_TAB_REPOSITORIES) {
    return <RightPanelRepoCards isPending={isPending} repos={repos ?? []} />;
  }

  if (tabSegment === TEXT_ROUTE_TAB_PROJECT) {
    return <RightPanelProjectCards projects={projects} />;
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
          <RightPanelJobCard
            jobListResult={jobListResult}
            technologies={technologies}
          />
        )}
        {tabSegment === TEXT_ROUTE_TAB_ORGANIZATION && (
          <RightPanelOrgCard org={organization} />
        )}
      </div>
    </div>
  );
};

export default memo(JobRightPanelCard);
