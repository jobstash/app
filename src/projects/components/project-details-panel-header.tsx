'use client';

import { DetailsPanelHeader } from '~/shared/components/details-panel/header';
import { DetailsPanelHeaderSkeleton } from '~/shared/components/details-panel/header-skeleton';

import { useProjectDetails } from '~/projects/hooks/use-project-details';

interface Props {
  id: string;
}

export const ProjectDetailsPanelHeader = ({ id }: Props) => {
  const { data } = useProjectDetails(id);

  if (!data) return <DetailsPanelHeaderSkeleton />;

  return <DetailsPanelHeader org={data.organization} />;
};
