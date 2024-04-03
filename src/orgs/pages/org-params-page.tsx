'use client';

import { ROUTE_TABS } from '~/shared/core/constants';

import { useOrgDetails } from '~/orgs/hooks/use-org-details';
import { OrgDetailsCard } from '~/orgs/components/org-details-card';
import { OrgReviews } from '~/orgs/components/org-reviews';
import { OtherJobCards } from '~/orgs/components/other-job-cards';
import { ProjectDetailsCards } from '~/projects/components/project-details-cards';

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
