'use client';

import dynamic from 'next/dynamic';

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

  if (tab === ROUTE_TABS.SHARED.DETAILS) {
    return <ProjectDetailsCard project={data} />;
  }

  if (tab === ROUTE_TABS.SHARED.ORG) {
    return <OrgDetailsCard withActions org={data.organization} />;
  }

  return null;
};

const ProjectDetailsCard = dynamic(() =>
  import(
    '~/projects/components/project-details-cards/project-details-card'
  ).then((m) => m.ProjectDetailsCard),
);

const OrgDetailsCard = dynamic(() =>
  import('~/orgs/components/org-details-card').then((m) => m.OrgDetailsCard),
);
