import { memo, useMemo, useTransition } from 'react';

import { useUrlFilterParams } from '~/features/filters/hooks';
import { Job } from '~/features/jobs/core/types';
import { ID_TOP_RIGHT_PANEL } from '~/shared/core/constants';
import { useRouteSegments } from '~/shared/hooks';

import JobRightPanelCard from './job-right-panel-card';
import JobRightPanelHeader from './job-right-panel-header';
import JobRightPanelTabs from './job-right-panel-tabs';
import JobRightPanelWrapper from './job-right-panel-wrapper';

interface Props {
  activeJob: Job | null;
}

const JobRightPanel = ({ activeJob }: Props) => {
  const { segments, push } = useRouteSegments();

  const { filterParams } = useUrlFilterParams();
  const [isPending, startTransition] = useTransition();
  const onClickTab = (tabRoute: string) =>
    startTransition(() =>
      push(
        `/jobs/${segments.key}/${tabRoute}${
          filterParams ? '?' + filterParams : ''
        }`,
        {
          shouldScroll: false,
          shallow: true,
        },
      ),
    );

  if (!activeJob) return <p>Loading right-panel</p>;

  const { organization, project, fundingRounds } = activeJob;

  return (
    <JobRightPanelWrapper>
      <div className="absolute top-0" id={ID_TOP_RIGHT_PANEL} />
      <JobRightPanelHeader
        organization={organization}
        fundingRounds={fundingRounds}
      />
      <JobRightPanelTabs
        tab={segments.tab}
        isPending={isPending}
        hasProject={Boolean(project)}
        onClickTab={onClickTab}
      />
      <JobRightPanelCard
        job={activeJob}
        tabSegment={segments.tab}
        isPending={isPending}
      />
    </JobRightPanelWrapper>
  );
};

export default memo(JobRightPanel);
