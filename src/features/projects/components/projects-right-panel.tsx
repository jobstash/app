import type { Listing } from '~/core/interfaces';

import { ProjectRightPanel } from './project-right-panel';

interface Props {
  projects: Listing['projects'];
}

export const ProjectsRightPanel = ({ projects }: Props) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectRightPanel key={project.name} project={project} />
      ))}
    </div>
  );
};
