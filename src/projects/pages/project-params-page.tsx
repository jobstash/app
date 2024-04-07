'use client';

import { ROUTE_TABS } from '~/shared/core/constants';

import { useProjectDetails } from '~/projects/hooks/use-project-details';

interface Props {
  params: {
    id: string;
    tab: string;
  };
}

export const ProjectParamsPage = ({ params: { id, tab } }: Props) => {
  const { data } = useProjectDetails(id);

  if (!data) return null;

  if (tab === ROUTE_TABS.SHARED.DETAILS) return <p>ProjectDetailsCard</p>;
  if (tab === ROUTE_TABS.SHARED.ORG) return <p>ProjectOrgCard</p>;

  return null;
};
