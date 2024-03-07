'use client';

import { DetailsPanelHeader } from '~/shared/components/details-panel/header';
import { DetailsPanelHeaderSkeleton } from '~/shared/components/details-panel/header-skeleton';

import { useJobDetails } from '~/jobs/hooks/use-job-details';

interface Props {
  id: string;
}

export const JobDetailsPanelHeader = ({ id }: Props) => {
  const { data } = useJobDetails(id);

  if (!data) return <DetailsPanelHeaderSkeleton />;

  return <DetailsPanelHeader org={data.organization} />;
};
