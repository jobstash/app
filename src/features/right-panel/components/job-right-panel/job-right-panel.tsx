import { memo, useEffect, useTransition } from 'react';

import { useUrlFilterParams } from '~/features/filters/hooks';
import { Job } from '~/features/jobs/core/types';
import { useReposQuery } from '~/features/repos/hooks';
import { EVENT_CARD_CLICK, ID_TOP_RIGHT_PANEL } from '~/shared/core/constants';
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

  const { data: repos, isLoading: isLoadingOrgRepos } = useReposQuery(
    job?.organization.orgId,
  );

  if (!job || isLoadingOrgRepos) return <p>Loading right-panel</p>;

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
        repoCount={repos?.length}
        onClickTab={onClickTab}
      />

      <JobRightPanelCard
        job={job}
        repos={repos}
        tabSegment={segments.tab}
        isPending={isPending}
      />
    </JobRightPanelWrapper>
  );
};

export default memo(JobRightPanel);
