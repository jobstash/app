'use client';

import { DetailsPanelCardSkeleton } from '~/shared/components/details-panel/card-skeleton';

import { JobDetails } from '~/jobs/core/schemas';
import { useCompetitors } from '~/projects/hooks/use-competitors';

import { JobCompetitorCard } from './job-competitor-card';

interface Props {
  job: JobDetails;
}

export const JobCompetitorCards = ({ job }: Props) => {
  const {
    organization: { projects },
  } = job;

  const { data: competitors, error } = useCompetitors(
    projects.length > 0 ? projects[0].id : undefined,
  );

  if (projects.length === 0) return null;
  if (!competitors) return <DetailsPanelCardSkeleton />;
  if (error) return <p>TODO: Error UI</p>;

  return (
    <div className="flex flex-col gap-6">
      {competitors.data.map((competitor) => (
        <JobCompetitorCard key={competitor.id} competitor={competitor} />
      ))}
    </div>
  );
};
