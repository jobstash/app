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
  if (tab === ROUTE_TABS.SHARED.ORG)
    return <OrgDetailsCard withActions org={job.organization} />;
  if (tab === ROUTE_TABS.JOBS.PROJECTS)
    return <ProjectDetailsCards projects={job.organization.projects} />;

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

const OrgDetailsCard = dynamic(() =>
  import('~/orgs/components/org-details-card').then((m) => m.OrgDetailsCard),
);

const ProjectDetailsCards = dynamic(() =>
  import('~/projects/components/project-details-cards').then(
    (m) => m.ProjectDetailsCards,
  ),
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
