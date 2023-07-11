import { memo } from 'react';

import { type ProjectCompleteInfo } from '@jobstash/shared/core';

import RightPanelProjectCard from './right-panel-project-card';

interface Props {
  projects: ProjectCompleteInfo[];
}

const RightPanelProjectCards = ({ projects }: Props) => {
  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4">
      {projects.map((project) => (
        <RightPanelProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default memo(RightPanelProjectCards);
