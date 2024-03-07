import { JobDetails } from '~/jobs/core/schemas';

import { JobProjectCard } from './job-project-card';

interface Props {
  job: JobDetails;
}

export const JobProjectCards = ({ job }: Props) => {
  const {
    organization: { projects },
  } = job;

  if (!projects.length) return null;

  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => (
        <JobProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
