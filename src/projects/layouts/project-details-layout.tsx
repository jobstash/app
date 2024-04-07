import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { HREFS } from '~/shared/core/constants';
import { getQueryClient } from '~/shared/utils/get-query-client';
import { DetailsPanelLayout } from '~/shared/components/details-panel/layout';

import { projectQueryKeys } from '~/projects/core/query-keys';
import { getProjectDetails } from '~/projects/api/get-project-details';
import { InitProjectDetailsSyncer } from '~/projects/components/init-project-details-syncer';
import { ProjectDetailsPanelHeader } from '~/projects/components/project-details-panel-header';
import { ProjectTabs } from '~/projects/components/project-tabs';

interface Props {
  id: string;
  children: React.ReactNode;
}

export const ProjectDetailsLayout = async ({ id, children }: Props) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: projectQueryKeys.details(id),
    queryFn: () => getProjectDetails({ projectId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailsPanelLayout backHref={HREFS.PROJECTS_PAGE}>
        <InitProjectDetailsSyncer id={id} />
        <ProjectDetailsPanelHeader id={id} />
        <ProjectTabs id={id} />
        {children}
      </DetailsPanelLayout>
    </HydrationBoundary>
  );
};
