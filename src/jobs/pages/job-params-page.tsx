'use client';

import dynamic from 'next/dynamic';

import { ROUTE_TABS } from '~/shared/core/constants';

import { JobDetails } from '~/jobs/core/schemas';
import { useJobDetails } from '~/jobs/hooks/use-job-details';

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

const JobDetailsCard = dynamic(() =>
  import('~/jobs/components/job-details-card').then((m) => m.JobDetailsCard),
);

const JobOrgCard = dynamic(() =>
  import('~/jobs/components/job-org-card').then((m) => m.JobOrgCard),
);

const JobProjectCards = dynamic(() =>
  import('~/jobs/components/job-project-cards').then((m) => m.JobProjectCards),
);

const JobCompetitorCards = dynamic(() =>
  import('~/jobs/components/job-competitor-cards').then(
    (m) => m.JobCompetitorCards,
  ),
);

const JobOtherJobCards = dynamic(() =>
  import('~/jobs/components/job-other-job-cards').then(
    (m) => m.JobOtherJobCards,
  ),
);
