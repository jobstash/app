import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { HREFS } from '~/shared/core/constants';
import { getQueryClient } from '~/shared/utils/get-query-client';
import { DetailsPanelLayout } from '~/shared/components/details-panel/layout';

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
      <DetailsPanelLayout backHref={HREFS.JOBS_PAGE}>
        <InitJobDetailsSyncer id={id} />
        <JobDetailsPanelHeader id={id} />
        <JobTabs id={id} />
        {children}
      </DetailsPanelLayout>
    </HydrationBoundary>
  );
};
