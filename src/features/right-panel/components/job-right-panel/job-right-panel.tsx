import { memo, useMemo, useTransition } from 'react';

import { useUrlFilterParams } from '~/features/filters/hooks';
import { Job } from '~/features/jobs/core/types';
import { ID_TOP_RIGHT_PANEL } from '~/shared/core/constants';
import { useRouteSegments } from '~/shared/hooks';
import { getUrlWithFilters } from '~/shared/utils';

import JobRightPanelCard from './job-right-panel-card';
import JobRightPanelHeader from './job-right-panel-header';
import JobRightPanelTabs from './job-right-panel-tabs';
import JobRightPanelWrapper from './job-right-panel-wrapper';

interface Props {
  job?: Job | null;
}

const JobRightPanel = ({ job }: Props) => {
  const { segments, push } = useRouteSegments();

  const { filterParamsObj } = useUrlFilterParams();
  const [isPending, startTransition] = useTransition();
  const onClickTab = (tabRoute: string) =>
    startTransition(() => {
      const url = getUrlWithFilters(
        filterParamsObj,
        `/jobs/${segments.key}/${tabRoute}`,
      );

      return push(url.toString(), {
        shouldScroll: false,
        shallow: true,
      });
    });

  if (!job) return <p>Loading right-panel</p>;

  const { organization, project, fundingRounds } = job;

  return (
    <JobRightPanelWrapper>
      <div className="absolute top-0 h-0" id={ID_TOP_RIGHT_PANEL} />
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
        job={job}
        tabSegment={segments.tab}
        isPending={isPending}
      />
    </JobRightPanelWrapper>
  );
};

export default memo(JobRightPanel);
