import { memo, useMemo, useTransition } from 'react';

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
  const org = useMemo(() => activeJob?.organization, [activeJob?.organization]);

  const [isPending, startTransition] = useTransition();
  const onClickTab = (tabRoute: string) =>
    startTransition(() =>
      push(`/jobs/${segments.key}/${tabRoute}`, {
        shouldScroll: false,
        shallow: true,
      }),
    );

  if (!activeJob) return <p>Loading right-panel</p>;

  return (
    <JobRightPanelWrapper>
      <div className="absolute top-0" id={ID_TOP_RIGHT_PANEL} />
      <JobRightPanelHeader organization={org!} />
      <JobRightPanelTabs
        tab={segments.tab}
        isPending={isPending}
        hasProject={Boolean(activeJob.project)}
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
