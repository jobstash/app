'use client';

import { DetailsPanelCardSkeleton } from '~/shared/components/details-panel/card-skeleton';

import { useOrgDetails } from '~/orgs/hooks/use-org-details';

import { JobOtherJobCard } from './job-other-job-card';

interface Props {
  orgId: string;
}

export const JobOtherJobCards = ({ orgId }: Props) => {
  const { data, error } = useOrgDetails(orgId);

  if (!data) return <DetailsPanelCardSkeleton />;
  if (data.jobs.length === 0) return null;
  if (error) return <p>TODO: Error UI</p>;

  return (
    <div className="flex flex-col gap-6">
      {data.jobs.map((job) => (
        <JobOtherJobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
