import { memo } from 'react';

import { type ProjectInfo, type ProjectMoreInfo } from '@jobstash/shared/core';

import RightPanelProjectCard from './right-panel-project-card';

interface Props {
  projects: (ProjectInfo & ProjectMoreInfo)[];
  showCTA?: boolean;
}

const RightPanelProjectCards = ({ projects, showCTA }: Props) => {
  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4">
      {projects.map((project) => (
        <RightPanelProjectCard
          key={project.id}
          project={project}
          showCTA={showCTA}
        />
      ))}
    </div>
  );
};

export default memo(RightPanelProjectCards);
