'use client';

import dynamic from 'next/dynamic';

import { ROUTE_TABS } from '~/shared/core/constants';

import { useOrgDetails } from '~/orgs/hooks/use-org-details';

interface Props {
  params: {
    id: string;
    tab: string;
  };
}

export const OrgParamsPage = ({ params: { id, tab } }: Props) => {
  const { data } = useOrgDetails(id);

  if (!data) return null;

  if (tab === ROUTE_TABS.SHARED.DETAILS) return <OrgDetailsCard org={data} />;
  if (tab === ROUTE_TABS.ORGS.PROJECTS)
    return <ProjectDetailsCards projects={data.projects} />;
  if (tab === ROUTE_TABS.ORGS.JOBS) return <OtherJobCards jobs={data.jobs} />;
  if (tab === ROUTE_TABS.ORGS.REVIEWS) return <OrgReviews org={data} />;

  return null;
};

const OrgDetailsCard = dynamic(() =>
  import('~/orgs/components/org-details-card').then((m) => m.OrgDetailsCard),
);

const ProjectDetailsCards = dynamic(() =>
  import('~/projects/components/project-details-cards').then(
    (m) => m.ProjectDetailsCards,
  ),
);

const OtherJobCards = dynamic(() =>
  import('~/orgs/components/other-job-cards').then((m) => m.OtherJobCards),
);

const OrgReviews = dynamic(() =>
  import('~/orgs/components/org-reviews').then((m) => m.OrgReviews),
);
