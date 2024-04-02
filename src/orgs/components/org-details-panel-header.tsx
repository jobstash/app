'use client';

import { DetailsPanelHeader } from '~/shared/components/details-panel/header';
import { DetailsPanelHeaderSkeleton } from '~/shared/components/details-panel/header-skeleton';

import { useOrgDetails } from '~/orgs/hooks/use-org-details';

interface Props {
  id: string;
}

export const OrgDetailsPanelHeader = ({ id }: Props) => {
  const { data } = useOrgDetails(id);

  if (!data) return <DetailsPanelHeaderSkeleton />;

  return <DetailsPanelHeader org={data} />;
};
