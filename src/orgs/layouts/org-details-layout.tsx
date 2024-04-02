import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { HREFS } from '~/shared/core/constants';
import { getQueryClient } from '~/shared/utils/get-query-client';
import { DetailsPanelLayout } from '~/shared/components/details-panel/layout';

import { orgQueryKeys } from '~/orgs/core/query-keys';
import { getOrgDetails } from '~/orgs/api/get-org-details';
import { InitOrgDetailsSyncer } from '~/orgs/components/init-org-details-syncer';
import { OrgDetailsPanelHeader } from '~/orgs/components/org-details-panel-header';
import { OrgTabs } from '~/orgs/components/org-tabs';

interface Props {
  children: React.ReactNode;
  id: string;
}

export const OrgDetailsLayout = async ({ children, id }: Props) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: orgQueryKeys.details(id),
    queryFn: () => getOrgDetails(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailsPanelLayout backHref={HREFS.ORGS_PAGE}>
        <InitOrgDetailsSyncer id={id} />
        <OrgDetailsPanelHeader id={id} />
        <OrgTabs id={id} />
        {children}
      </DetailsPanelLayout>
    </HydrationBoundary>
  );
};
