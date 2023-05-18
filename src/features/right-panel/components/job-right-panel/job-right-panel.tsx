import { memo, useEffect, useTransition } from 'react';

import { useUrlFilterParams } from '~/features/filters/hooks';
import { JobListResult } from '~/features/jobs/core/types';
import { useCompetitorsQuery } from '~/features/projects/hooks';
import { useReposQuery } from '~/features/repos/hooks';
import {
  ArrowLeft,
  Button,
  Loader,
  MobileMenuButton,
} from '~/shared/components';
import { EVENT_CARD_CLICK, ID_TOP_RIGHT_PANEL } from '~/shared/core/constants';
import { useRouteSegments } from '~/shared/hooks';
import { getUrlWithFilters } from '~/shared/utils';

import JobRightPanelCard from './job-right-panel-card';
import JobRightPanelHeader from './job-right-panel-header';
import JobRightPanelTabs from './job-right-panel-tabs';
import JobRightPanelWrapper from './job-right-panel-wrapper';

interface Props {
  jobListResult?: JobListResult | null;
}

const JobRightPanel = ({ jobListResult }: Props) => {
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

  const { data: repos } = useReposQuery(jobListResult?.organization.orgId);

  // TODO: competitors
  // const { data: competitors } = useCompetitorsQuery(jobListResult?.project?.id);

  if (!jobListResult)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );

  const { organization } = jobListResult;
  const { projects, fundingRounds } = organization;

  return (
    <JobRightPanelWrapper>
      <div className="absolute top-0 h-0" id={ID_TOP_RIGHT_PANEL} />
      <div className="flex justify-between pb-6 lg:hidden">
        <Button
          variant="outline"
          left={<ArrowLeft />}
          size="md"
          onClick={() => push('/jobs', { shallow: true, shouldScroll: false })}
        >
          Back
        </Button>
        <MobileMenuButton />
      </div>
      <JobRightPanelHeader
        organization={organization}
        fundingRounds={fundingRounds}
      />
      <JobRightPanelTabs
        tab={segments.tab}
        isPending={isPending}
        projectCount={projects.length}
        repoCount={repos?.length}
        //
        // competitorsCount={competitors?.length}
        competitorsCount={0}
        onClickTab={onClickTab}
      />
      <JobRightPanelCard
        jobListResult={jobListResult}
        repos={repos}
        tabSegment={segments.tab}
        isPending={isPending}
        //
        // competitors={competitors}
        competitors={undefined}
      />
    </JobRightPanelWrapper>
  );
};

export default memo(JobRightPanel);
