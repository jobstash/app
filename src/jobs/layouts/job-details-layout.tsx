import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { HREFS } from '~/shared/core/constants';
import { getQueryClient } from '~/shared/utils/get-query-client';
import { DetailsPanelBackButton } from '~/shared/components/details-panel/back-button';
import { MobileHeader } from '~/shared/components/mobile-header';
import { PageScrollDisableSyncer } from '~/shared/components/page-scroll-syncer';

import { jobQueryKeys } from '~/jobs/core/query-keys';
import { orgQueryKeys } from '~/orgs/core/query-keys';
import { projectQueryKeys } from '~/projects/core/query-keys';
import { getJobDetails } from '~/jobs/api/get-job-details';
import { getOrgDetails } from '~/orgs/api/get-org-details';
import { getCompetitors } from '~/projects/api/get-competitors';
import { InitJobDetailsSyncer } from '~/jobs/components/init-job-details-syncer';
import { JobDetailsPanelHeader } from '~/jobs/components/job-details-panel-header';
import { JobTabs } from '~/jobs/components/job-tabs';

interface Props {
  children: React.ReactNode;
  id: string;
}

const queryClient = getQueryClient();

export const JobDetailsLayout = async ({ children, id }: Props) => {
  // `ensureQueryData` because we want to make use of the cache
  // job-list already sets this data
  const {
    organization: { orgId, projects },
  } = await queryClient.ensureQueryData({
    queryKey: jobQueryKeys.details(id),
    queryFn: () => getJobDetails(id),
  });

  const prefetches = [
    queryClient.prefetchQuery({
      queryKey: orgQueryKeys.details(orgId),
      queryFn: () => getOrgDetails(orgId),
    }),
  ];

  if (projects.length > 0) {
    const projectId = projects[0].id;
    prefetches.push(
      queryClient.prefetchQuery({
        queryKey: projectQueryKeys.competitors(projectId),
        queryFn: () => getCompetitors(projectId),
      }),
    );
  }

  await Promise.all(prefetches);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="hide-scrollbar fixed right-0 top-0 z-20 h-full min-h-screen w-full overflow-y-auto bg-darkest-gray pt-[68px] md:w-[calc((100%-212px))] md:pt-20 lg:w-[calc((100%-212px)/2)] lg:pt-0">
        <MobileHeader
          left={<DetailsPanelBackButton href={HREFS.JOBS_PAGE} />}
          className="z-50 bg-darkest-gray md:left-auto md:right-0 md:flex md:w-[calc((100%-220px))] lg:hidden"
        />
        <div className="flex flex-col gap-4 p-5 lg:p-6">
          <InitJobDetailsSyncer id={id} />
          <JobDetailsPanelHeader id={id} />
          <JobTabs id={id} />
          {children}
        </div>

        <PageScrollDisableSyncer shouldDisable={true} />
      </div>
    </HydrationBoundary>
  );
};
