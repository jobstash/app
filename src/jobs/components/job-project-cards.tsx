import { JobDetails } from '~/jobs/core/schemas';
import { ProjectDetailsCards } from '~/projects/components/project-details-cards';

interface Props {
  job: JobDetails;
}

export const JobProjectCards = ({ job }: Props) => {
  const {
    organization: { projects },
  } = job;

  if (!projects.length) return null;

  return <ProjectDetailsCards projects={projects} />;
};
