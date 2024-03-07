'use client';

import { ROUTE_TABS } from '~/shared/core/constants';

import { JobDetails } from '~/jobs/core/schemas';
import { useJobDetails } from '~/jobs/hooks/use-job-details';
import { JobCompetitorCards } from '~/jobs/components/job-competitor-cards';
import { JobDetailsCard } from '~/jobs/components/job-details-card';
import { JobOrgCard } from '~/jobs/components/job-org-card';
import { JobOtherJobCards } from '~/jobs/components/job-other-job-cards';
import { JobProjectCards } from '~/jobs/components/job-project-cards';

interface Props {
  params: {
    id: string;
    tab: string;
  };
}

export const JobParamsPage = ({ params: { id, tab } }: Props) => {
  const { data } = useJobDetails(id);

  if (!data) return null;

  const pageContent = getPageContent(data, tab);

  return <>{pageContent}</>;
};

const getPageContent = (job: JobDetails, tab: string) => {
  if (tab === ROUTE_TABS.SHARED.DETAILS) return <JobDetailsCard job={job} />;
  if (tab === ROUTE_TABS.SHARED.ORG) return <JobOrgCard job={job} />;
  if (tab === ROUTE_TABS.JOBS.PROJECTS) return <JobProjectCards job={job} />;

  if (tab === ROUTE_TABS.JOBS.COMPETITORS) {
    return <JobCompetitorCards job={job} />;
  }

  if (tab === ROUTE_TABS.JOBS.OTHER_JOBS)
    return <JobOtherJobCards orgId={job.organization.orgId} />;

  return null;
};
