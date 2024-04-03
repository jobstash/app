import { ProjectAllInfo } from '~/shared/core/schemas';

import { ProjectDetailsCard } from './project-details-card';

interface Props {
  projects: ProjectAllInfo[];
}

export const ProjectDetailsCards = ({ projects }: Props) => {
  if (!projects.length) return null;

  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => (
        <ProjectDetailsCard key={project.id} project={project} />
      ))}
    </div>
  );
};
