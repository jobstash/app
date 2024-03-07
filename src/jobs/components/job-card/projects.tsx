import { ProjectInfo } from '~/shared/core/schemas';

import { JobCardProject } from './project';

interface Props {
  projects: ProjectInfo[];
}

export const JobCardProjects = ({ projects }: Props) => {
  if (projects.length === 0) return null;

  const sortedProjects = projects
    .sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0))
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-3">
      {sortedProjects.map((project) => (
        <JobCardProject key={project.id} project={project} />
      ))}
    </div>
  );
};
