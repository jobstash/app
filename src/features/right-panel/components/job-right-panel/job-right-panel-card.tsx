import { memo, ReactNode } from 'react';

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

const Wrapper = ({
  children,
  isPending,
}: {
  children: ReactNode;
  isPending: boolean;
}) => (
  <div
    className={clsx(
      'mt-8 rounded-3xl bg-gradient-to-l from-primary to-tertiary p-0.5',
      { 'select-none pointer-events-none': isPending },
    )}
  >
    <div className="rounded-3xl bg-darker-gray">{children}</div>
  </div>
);

const JobRightPanelCard = ({
  tabSegment,
  isPending,
  job: { jobpost, organization, project, technologies },
}: Props) => {
  if (tabSegment === TEXT_ROUTE_TAB_COMPETITORS) {
    return (
      <div className="flex flex-col gap-4">
        <Wrapper isPending={isPending}>
          <RightPanelCompetitorsCard />
        </Wrapper>
        <Wrapper isPending={isPending}>
          <RightPanelCompetitorsCard />
        </Wrapper>
        <Wrapper isPending={isPending}>
          <RightPanelCompetitorsCard />
        </Wrapper>
      </div>
    );
  }

  return (
    <Wrapper isPending={isPending}>
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
    </Wrapper>
  );
};

export default memo(JobRightPanelCard);
