'use client';

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

  if (tab === ROUTE_TABS.SHARED.DETAILS) return <p>OrgDetailsCard</p>;
  if (tab === ROUTE_TABS.ORGS.PROJECTS) return <p>OrgProjectsCard</p>;
  if (tab === ROUTE_TABS.ORGS.JOBS) return <p>OrgJobsCard</p>;
  if (tab === ROUTE_TABS.ORGS.REVIEWS) return <p>OrgReviewsCard</p>;

  return null;
};
